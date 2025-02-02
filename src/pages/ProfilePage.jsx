import React from 'react';


const ProfilePage = ({ user, projects }) => {
  return (
    <div className="profile-page">
      <h1>{user.name}</h1>
      <h2>Your Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProfilePage;