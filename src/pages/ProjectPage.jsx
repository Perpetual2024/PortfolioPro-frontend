import React from 'react'
import ProjectForm from '../components/ProjectForm'
import ProjectSkillForm from '../components/ProjectSkill'; 
import Comments from '../components/Comment'
import BookmarkForm from '../components/Bookmark';
    function ProjectPage() {
        const handleAddProject = (project) => {
          
          alert("Project added:", project);
        };
      
        return (
          <div>
            <h1>Project Page</h1>
            <ProjectForm handleAddProject={handleAddProject} />
        

                 <h3>Project Skills</h3>
                 <ProjectSkillForm />

                 
                 <Comments />

                 <BookmarkForm />
                 
          </div>
        );
      }
      
      export default ProjectPage;
 