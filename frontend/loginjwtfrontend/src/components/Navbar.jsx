import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">JWT Auth</Link>
      <div className="navbar-nav">
        {isAuthenticated ? (
          <>
            <span className="nav-link">Welcome, {currentUser?.name}</span>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;