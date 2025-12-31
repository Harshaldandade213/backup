import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  setupComplete?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  isAuthenticated,
  setupComplete = false,
}) => {
  // If authenticated and setup complete, redirect to dashboard
  if (isAuthenticated && setupComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated but setup not complete, redirect to setup
  if (isAuthenticated && !setupComplete) {
    return <Navigate to="/setup" replace />;
  }

  return <>{children}</>;
};
