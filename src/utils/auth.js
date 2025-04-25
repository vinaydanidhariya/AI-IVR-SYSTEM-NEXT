import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-should-be-in-env-file';

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const getAuthHeader = () => {
  // Safe check for SSR - only access localStorage on client
  if (typeof window === 'undefined') {
    return {};
  }
  
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const isAuthenticated = () => {
  // Safe check for SSR - only access localStorage on client
  if (typeof window === 'undefined') {
    return false;
  }
  
  const token = localStorage.getItem('token');
  return !!token;
}; 