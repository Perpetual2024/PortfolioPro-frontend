import { useState, useEffect } from 'react';

const SkillList = ({ projectId }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [newSkill, setNewSkill] = useState({ name: '', details: '' });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('https://portfoliopro-477e.onrender.com/skill');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleAddSkill = async () => {
    if (!selectedSkill) {
      console.error('No skill selected');
      return;
    }

    try {
      await fetch('https://portfoliopro-477e.onrender.com/projectskill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, skillId: selectedSkill }),
      });

      alert('Skill added to project');
    } catch (error) {
      console.error('Error linking skill to project:', error);
    }
  };

  const handleCreateSkill = async () => {
    if (!newSkill.name || !newSkill.details) {
      console.error('Skill name and details are required');
      return;
    }

    try {
      const response = await fetch('https://portfoliopro-477e.onrender.com/skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });

      const createdSkill = await response.json();
      setSkills([...skills, createdSkill]);
      setNewSkill({ name: '', details: '' });

      alert('New skill created');
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  return (
    <div>
      <h3>Skills</h3>

      {/* Select and Add Existing Skill */}
      <select onChange={(e) => setSelectedSkill(e.target.value)} value={selectedSkill}>
  <option value="">View a skill</option>
  {skills.map((skill) => (
    <option key={skill.id} value={skill.id}>
      {skill.name} ({skill.details})
    </option>
  ))}
</select>

      {/* Create New Skill */}
      <h4>Create New Skill</h4>
      <input
        type="text"
        placeholder="Skill name"
        value={newSkill.name}
        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Skill details"
        value={newSkill.details}
        onChange={(e) => setNewSkill({ ...newSkill, details: e.target.value })}
      />
      <button onClick={handleCreateSkill}>Create Skill</button>
    </div>
  );
};

export default SkillList;
