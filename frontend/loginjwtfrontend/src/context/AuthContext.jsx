import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You could fetch user data here if needed
      fetchUserData(token);
    }
    setLoading(false);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('authloginjwt.vercel.app/api/auth/me', {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(userData);
      } else {
        // Token might be invalid
        logout();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    }
  };

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      loading,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;