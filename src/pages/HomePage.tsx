import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>Welcome back, {user?.name}!</h2>
        <p>You are successfully authenticated via {user?.provider}.</p>
      </div>
      
      <div className="original-content">
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
};