import React, { useState, useEffect } from "react";

const Comments = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch available projects for the user to comment on
  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await fetch("https://portfoliopro-477e.onrender.com/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setErrorMessage("Error fetching projects: " + error.message);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch existing comments for the selected project
  useEffect(() => {
    if (!selectedProjectId) {
      setComments([]); // Reset comments when no project is selected
      return;
    }

    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const response = await fetch("https://portfoliopro-477e.onrender.com/comment");
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        const filteredComments = data.filter(
          (comment) => comment.project_id === Number(selectedProjectId)
        );
        setComments(filteredComments);
      } catch (error) {
        setComments([]);
        setErrorMessage("Error fetching comments: " + error.message);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [selectedProjectId]);

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!userId || !selectedProjectId || !content) {
      alert("Please fill out all fields: user ID, select a project, and enter a comment.");
      return;
    }

    try {
      const response = await fetch("https://portfoliopro-477e.onrender.com/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          project_id: selectedProjectId,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newComment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      setContent("");
      setUserId("");
    } catch (error) {
      alert("Error submitting comment: " + error.message);
    }
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>

      {/* Error message display */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="comment-form">
        <div className="form-group">
          <label htmlFor="user_id">User ID:</label>
          <input
            id="user_id"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="project">Select Project:</label>
          <select
            id="project"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="form-input"
          >
            <option value="">Select a project</option>
            {loadingProjects ? (
              <option>Loading projects...</option>
            ) : (
              projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Displaying existing comments */}
      <h4>Existing Comments</h4>
      {loadingComments ? (
        <p>Loading comments...</p>
      ) : (
        <ul className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p><strong>{comment.user_id}</strong>: {comment.content}</p>
              </li>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Comments;
