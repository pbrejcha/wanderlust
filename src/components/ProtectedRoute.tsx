import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { styled } from '@linaria/react';
import { useAuth } from '../contexts/AuthContext';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingMessage = styled.div`
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
`;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingMessage>Loading...</LoadingMessage>
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};