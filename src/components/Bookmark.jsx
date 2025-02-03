import { useState, useEffect } from "react";

const BookmarkForm = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [userId, setUserId] = useState(""); // State for user ID
  const [bookmarkedProjects, setBookmarkedProjects] = useState(new Set());

  // Fetch projects & existing bookmarks on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects
        const projectResponse = await fetch("http://127.0.0.1:5555/projects");
        const projectData = await projectResponse.json();
        setProjects(projectData);

        // Fetch existing bookmarks
        const bookmarkResponse = await fetch("http://127.0.0.1:5555/bookmark");
        const bookmarkData = await bookmarkResponse.json();
        const bookmarkedIds = new Set(bookmarkData.map((b) => b.project_id));
        setBookmarkedProjects(bookmarkedIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle bookmark toggle
  const handleBookmarkToggle = async (e) => {
    e.preventDefault();
    if (!selectedProject) return alert("Please select a project.");
    if (!userId) return alert("Please enter your user ID.");

    const requestBody = {
      user_id: userId,
      project_id: selectedProject,
      action: bookmarkedProjects.has(selectedProject) ? "unbookmark" : "bookmark",
    };

    console.log("Request Body:", requestBody); // Log the request body

    try {
      const response = await fetch("http://127.0.0.1:5555/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      console.log("Response Status:", response.status); // Log the response status

      if (response.ok) {
        if (requestBody.action === "bookmark") {
          setBookmarkedProjects((prev) => new Set(prev).add(selectedProject));
          alert("Project bookmarked successfully!");
        } else {
          setBookmarkedProjects((prev) => {
            const updated = new Set(prev);
            updated.delete(selectedProject);
            return updated;
          });
          alert("Project unbookmarked successfully!");
        }
      } else {
        const errorData = await response.json();
        console.error("Error Data:", errorData); // Log the error data
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      alert("An error occurred while toggling the bookmark.");
    }
  };

  return (
    <div className="bookmark_container"> 
      <h2>Bookmark a Project</h2>
      <form onSubmit={handleBookmarkToggle}>
        <label>Enter your user ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Your user ID"
        />

        <label>Select a project:</label>
        <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
          <option value="">-- Choose a Project --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
        <button type="submit">
          {bookmarkedProjects.has(selectedProject) ? "Unbookmark" : "Bookmark"}
        </button>
      </form>

      {selectedProject && (
        <p className={bookmarkedProjects.has(selectedProject) ? "bookmarked" : "not-bookmarked"}>
          {bookmarkedProjects.has(selectedProject) ? "✅ Bookmarked!" : "❌ Not bookmarked."}
        </p>
      )}
    </div>
  );
};

export default BookmarkForm;
