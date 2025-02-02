import React, { useState, useEffect } from "react";

function ProjectForm({ handleAddProject , projectToEdit}) {
  const [projectName, setProjectName] = useState({
    title: "",
    description: "",
    image: "",
    user_id: 0,
  });

  useEffect(()=> {
    if (projectToEdit) {
      setProjectName(projectToEdit);
    }
  }, [projectToEdit]);

  const handleProjectChange = (event) => {
    setProjectName({ ...projectName, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProject = { ...projectName };

    const method = projectToEdit ? "PUT" : "POST";
    const url = projectToEdit
    ? `http://127.0.0.1:5555/projects/${projectToEdit.id}`
    : "http://127.0.0.1:5555/projects";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((project) => handleAddProject(project))
      .catch((error) => alert.error(error));
  };

  return (
    <div>
      <h2>{projectToEdit ? "Edit Project" : "Add Project"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project name"
          value={projectName.title}
          onChange={handleProjectChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Project description"
          value={projectName.description}
          onChange={handleProjectChange}
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={projectName.image}
          onChange={handleProjectChange}
        />
        
        <input
          type="number"
          name="user_id"
          placeholder="User ID"
          value={projectName.user_id}
          onChange={handleProjectChange}
        />
        <button type="submit">{projectToEdit ? "Update Project" : "Add Project"}</button>
      </form>
    </div>
  );
}

export default ProjectForm;
