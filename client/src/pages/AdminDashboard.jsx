 import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/admin/adminSlice';

const AdminDashboard = () => {
  const [userdata, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const res = await fetch("http://localhost:3000/api/admin/dashboard");
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setUserData(data); // Set fetched data into state
    } catch (error) {
      console.error(error);
    }
  }

  const handleView = (userId) => {
    navigate(`/viewmore/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/delete/${userId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUserData(userdata.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      dispatch(signOutSuccess());
      navigate('/admin-login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const filteredUsers = userdata.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addUser = () => {
    navigate(`/adduser`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-gray-800 text-white p-4 relative">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-xl font-semibold text-yellow-500 hover:text-red-500 transition-colors duration-300">Admin Dashboard</h1>
        </div>
        <button 
          className="absolute right-4 top-4 text-red-500 py-2 px-4 rounded hover:text-yellow-500" 
          onClick={handleLogout}
        >
          Log Out
        </button>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <input 
          type="text" 
          className="bg-white border border-blue-500 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4" 
          placeholder="Search by username" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginLeft: '58rem' }} onClick={addUser}>Add User</button>
        <table className="w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-2 px-4">Username</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Profile Picture</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <img src={user.profilePicture} alt={user.username} className="w-8 h-8 rounded-full" />
                </td>
                <td className="py-2 px-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleView(user._id)}>
                    View
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
