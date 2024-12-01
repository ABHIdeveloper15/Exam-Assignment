import React, { useEffect, useState } from 'react';

function UserData() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') 
      .then(response => response.json())
      .then(data => {
        const formattedUsers = data.map(user => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ').slice(1).join(' '),
          // firstName: user.firstname,
          // lastName: user.firstname,
          email: user.email,
          phone: user.phone,
          company: user.company.name,
          website: user.website,
        }));
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('');
      });
  }, []);

 
  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  
  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      !newUser.firstName.trim() ||
      !newUser.lastName.trim() ||
      !newUser.email.trim()
    ) {
      setError('First name, last name, and email are required.');
      return;
    }
    const addedUser = {
      id: users.length + 1,
      ...newUser,
    };
    const updatedUsers = [...users, addedUser];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      website: '',
    });
    setError('');
  };
  const handleEditUser = (user) => {
    setEditingUser(user);
    setError('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (
      !editingUser.firstName.trim() ||
      !editingUser.lastName.trim() ||
      !editingUser.email.trim()
    ) {
      setError('First name, last name, and email are required.');
      return;
    }
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setEditingUser(null);
    setError('');
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

 
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="user-data">
      <h2>User Data</h2>
      {error && <p className="error">{error}</p>}
      
      
      <input 
        type="text" 
        placeholder="Search by name or email..." 
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            editingUser && editingUser.id === user.id ? (
              <tr key={user.id}>
                <td>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={editingUser.firstName}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="First Name"
                  />
                  <input 
                    type="text" 
                    name="lastName" 
                    value={editingUser.lastName}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Last Name"
                  />
                </td>
                <td>
                  <input 
                    type="email" 
                    name="email" 
                    value={editingUser.email}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    name="phone" 
                    value={editingUser.phone}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    name="company" 
                    value={editingUser.company}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    name="website" 
                    value={editingUser.website}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </td>
                <td>
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEditingUser(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company}</td>
                <td>{user.website}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>

     
      <h3>Add New User</h3>
      <form onSubmit={handleAddUser} className="add-user-form">
        <div>
          <input 
            type="text" 
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input 
            type="text" 
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>
        <div>
          <input 
            type="email" 
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>
        <div>
          <input 
            type="text" 
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
        </div>
        <div>
          <input 
            type="text" 
            name="company"
            value={newUser.company}
            onChange={handleInputChange}
            placeholder="Company"
          />
        </div>
        <div>
          <input 
            type="text" 
            name="website"
            value={newUser.website}
            onChange={handleInputChange}
            placeholder="Website"
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserData;
