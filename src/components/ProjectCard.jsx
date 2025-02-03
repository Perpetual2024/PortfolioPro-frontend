import React from 'react';

function ProjectCard({ project, handleDeleteProject, handleEditProject }) {
  const handleDelete = () => {
    fetch(`https://portfoliopro-477e.onrender.com/projects/${project.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => handleDeleteProject(project.id))
      .catch((error) => console.error('Error deleting project:', error));
  };

  const handleEdit = () => {
    handleEditProject(project); // Set the project to edit in parent component
  };

  return (
  <div className='project-card-container'>  
    <div className="project-card">
       <h2 className="project-title">{project.title}</h2>
       <p className="project-description">{project.description}</p>
       <img src={project.image} alt={project.title} className="project-image" />
       <p className="project-user-id"><strong>User ID:</strong> {project.user_id}</p>
    <div className="project-actions">
       <button className="edit-button" onClick={handleEdit}>Edit Project</button>
       <button className="delete-button" onClick={handleDelete}>Delete Project</button>
  </div>
</div>
</div>
  );
}

export default ProjectCard;
