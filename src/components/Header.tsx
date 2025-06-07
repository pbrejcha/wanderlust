import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h2>Vamos</h2>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            {user.avatar_url && (
              <img 
                src={user.avatar_url} 
                alt={user.name}
                className="user-avatar"
              />
            )}
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-provider">via {user.provider}</span>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="logout-button"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};