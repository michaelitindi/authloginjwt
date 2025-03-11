import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <h2>Welcome, {currentUser?.name}!</h2>
      <p>This is your dashboard.</p>
      <button onClick={logout} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign Out</button>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  );
};

export default Dashboard;