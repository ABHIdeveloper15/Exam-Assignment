import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import UserData from './components/UserData';
import Settings from './components/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/home" /> : <LoginForm onLogin={handleLogin} />} 
        />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute user={user}>
              <Home userName={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user-data" 
          element={
            <ProtectedRoute user={user}>
              <UserData />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute user={user}>
              <Settings onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to={user ? "/home" : "/"} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
