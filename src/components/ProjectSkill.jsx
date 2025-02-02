import { useState } from 'react';

const ProjectSkillForm = () => {
  const [projectId, setProjectId] = useState('');
  const [skillId, setSkillId] = useState('');
  const [message, setMessage] = useState('');

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
        <div>
          <label>Project ID:</label>
          <input
            type="number"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>
        <div>
          <label>Skill ID:</label>
          <input
            type="number"
            value={skillId}
            onChange={(e) => setSkillId(e.target.value)}
          />
        </div>
        <button type="submit">Assign Skill</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProjectSkillForm;
