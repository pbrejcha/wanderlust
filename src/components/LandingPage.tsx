import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to Vamos</h1>
          <p className="hero-subtitle">
            Your secure application with OAuth authentication
          </p>
          <div className="hero-actions">
            <Link to="/login" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/login" className="cta-button secondary">
              Sign In
            </Link>
          </div>
        </div>
        
        <div className="features-section">
          <h2 className="features-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure Authentication</h3>
              <p>OAuth integration with GitHub and Google for secure login</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Modern</h3>
              <p>Built with React and modern web technologies</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful UI</h3>
              <p>Clean, responsive design that works on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};