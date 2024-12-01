import React from 'react';
import { useNavigate } from 'react-router-dom';

function Settings({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Settings;
