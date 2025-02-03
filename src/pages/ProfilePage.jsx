import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [editUser, setEditUser] = useState(null); // For editing a user

  useEffect(() => {
    fetch('http://127.0.0.1:5555/user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email) return alert('Please fill all fields.');

    try {
      const response = await fetch('http://127.0.0.1:5555/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({ username: '', email: '' }); // Reset form
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Handle editing a user
  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!editUser.username || !editUser.email) return alert('Please fill all fields.');

    try {
      const response = await fetch(`http://127.0.0.1:5555/user/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      });
      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === editUser.id ? updatedUser : user)));
      setEditUser(null); // Clear edit form
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/user/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
        alert('User deleted successfully!');
      } else {
        alert('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profiles</h2>

      {/* Add User Form */}
      <form onSubmit={handleAddUser}>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      {/* Edit User Form */}
      {editUser && (
        <form onSubmit={handleEditUser}>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Username"
            value={editUser.username}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <button type="submit">Update User</button>
        </form>
      )}

      {/* Users Table */}
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => setEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;

