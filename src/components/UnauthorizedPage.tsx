import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UnauthorizedPage.css';

export const UnauthorizedPage: React.FC = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="unauthorized-icon">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"/>
            <path d="m4.9 4.9 14.2 14.2"/>
          </svg>
        </div>
        
        <h1>Access Denied</h1>
        
        <p>
          You need to be authenticated to access this page. 
          Please sign in with your GitHub or Google account to continue.
        </p>
        
        <div className="unauthorized-actions">
          <Link to="/login" className="login-link">
            Sign In
          </Link>
          
          <Link to="/" className="home-link">
            Go Home
          </Link>
        </div>
        
        {from !== '/' && (
          <p className="return-info">
            After signing in, you'll be redirected to <code>{from}</code>
          </p>
        )}
      </div>
    </div>
  );
};