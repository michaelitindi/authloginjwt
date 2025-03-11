import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      if (response.token) {
        login(response.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        <h2>Welcome Back</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;