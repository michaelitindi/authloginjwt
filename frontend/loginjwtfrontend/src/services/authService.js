const API_URL = 'https://authloginjwt.vercel.app';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
      mode: 'cors'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || 'Registration failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Failed to connect to the server');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
      mode: 'cors'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || 'Login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Failed to connect to the server');
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      credentials: 'include',
      mode: 'cors'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || 'Failed to get user data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get user error:', error);
    throw new Error(error.message || 'Failed to connect to the server');
  }
};

export const getProtectedData = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) throw new Error('No token found');
  
  try {
    const response = await fetch(`${API_URL}/api/private/test`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      credentials: 'include',
      mode: 'cors'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || 'Failed to get protected data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Protected data error:', error);
    throw new Error(error.message || 'Failed to connect to the server');
  }
};