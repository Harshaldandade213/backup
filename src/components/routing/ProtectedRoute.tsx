import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  requiresSetup?: boolean;
  setupComplete?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  requiresSetup = false,
  setupComplete = false,
}) => {
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but setup not complete, redirect to setup
  if (requiresSetup && !setupComplete) {
    return <Navigate to="/setup" replace />;
  }

  // If setup complete but trying to access setup page, redirect to dashboard
  if (setupComplete && window.location.pathname === '/setup') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
