import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(username, password);
      if (data.success) {
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'An error occurred during login. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-body">
      <div className="login-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      
      <div className="login-card-container">
        <div className="login-glass-card">
          <div className="login-brand">
            <span className="brand-subtitle">ARUVI TOURS</span>
            <h1 className="brand-title">Management Console</h1>
            <div className="brand-separator"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="login-error-alert">
                <svg viewBox="0 0 24 24" className="error-icon">
                  <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-group-login">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" className="input-icon">
                  <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>
            
            <div className="form-group-login">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" className="input-icon">
                  <path fill="currentColor" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
            
            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? (
                <div className="login-spinner"></div>
              ) : (
                'Sign In to Console'
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Secure SSL Encrypted Connection</p>
            <p className="copyright">© 2026 Aruvi Tours. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
