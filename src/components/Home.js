import React from 'react';
import { Link } from 'react-router-dom';

function Home({ userName }) {
  return (
    <div className="home">
      <h2>Welcome, {userName}!</h2>
      <nav>
        <ul>
          <li><Link to="/user-data">User Data</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
