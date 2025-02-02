import { useState, useEffect } from 'react';

const ProjectSkillForm = () => {
  const [projectId, setProjectId] = useState('');
  const [skillId, setSkillId] = useState('');
  const [message, setMessage] = useState('');
  const [skills, setSkills] = useState([]); 
  const [projects, setProjects] = useState([]); 

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/skill'); 
        if (response.ok) {
          const data = await response.json();
          setSkills(data); 
        } else {
          setMessage('Failed to fetch skills');
        }
      } catch (error) {
        setMessage('Error fetching skills');
      }
    };

    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data); 
        } else {
          setMessage('Failed to fetch projects');
        }
      } catch (error) {
        setMessage('Error fetching projects');
      }
    };

    fetchSkills();
    fetchProjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5555/projectskill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: projectId,
          skill_id: skillId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error assigning skill to project');
      }
    } catch (error) {
      setMessage('Error assigning skill to project');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Project Dropdown */}
        <div>
          <label>Project:</label>
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title} (ID: {project.id})
              </option>
            ))}
          </select>
        </div>

        {/* Skill Dropdown */}
        <div>
          <label>Skill:</label>
          <select value={skillId} onChange={(e) => setSkillId(e.target.value)}>
            <option value="">Select a skill</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name} (ID: {skill.id})
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Assign Skill</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ProjectSkillForm;

