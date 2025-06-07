import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          console.error('Google OAuth error:', error);
          navigate('/unauthorized');
          return;
        }

        if (!code || !state) {
          console.error('Missing code or state parameter');
          navigate('/unauthorized');
          return;
        }

        // For development, we'll mock the token exchange
        // In production, this should call your backend API
        const mockUserData = {
          id: 'mock-google-user-' + Date.now(),
          name: 'Google User',
          email: 'user@gmail.com',
          avatar_url: 'https://lh3.googleusercontent.com/a/default-user',
          provider: 'google' as const,
        };

        login(mockUserData);
        navigate('/');
      } catch (error) {
        console.error('Google callback error:', error);
        navigate('/unauthorized');
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <div>Processing Google authentication...</div>
    </div>
  );
};