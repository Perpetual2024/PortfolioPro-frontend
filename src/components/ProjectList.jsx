import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [updatedProject, setUpdatedProject] = useState({
    title: "",
    description: "",
    image: "",
    user_id: "",
  });

  useEffect(() => {
    fetch("https://portfoliopro-477e.onrender.com/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const handleEditProject = (project) => {
    console.log("Editing project:", project);
    setProjectToEdit(project);
    setUpdatedProject({
      title: project.title,
      description: project.description,
      image: project.image,
      user_id: project.user_id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    fetch('https://portfoliopro-477e.onrender.com/projects/${projectToEdit.id}', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectToEdit.id ? data : project
          )
        );
        setProjectToEdit(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="project-container">
      <h2 className="project-list-title">Project List</h2>
      <div className="project-list">
        {projects
          .filter((project) => project.id)
          .map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              handleDeleteProject={handleDeleteProject}
              handleEditProject={handleEditProject}
            />
          ))}
      </div>

      {projectToEdit && (
        <div className="edit-form">
          <h3 className="edit-form-title">Edit Project</h3>
          <form onSubmit={handleSubmitEdit} className="edit-form-content">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={updatedProject.title}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={updatedProject.description}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                id="image"
                value={updatedProject.image}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="user_id" className="form-label">
                User ID
              </label>
              <input
                type="number"
                name="user_id"
                id="user_id"
                value={updatedProject.user_id}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setProjectToEdit(null)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
