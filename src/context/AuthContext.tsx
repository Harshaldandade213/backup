import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

interface User {
  email: string;
  password: string;
  name: string;
  organizationSetup: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setupComplete: boolean;
  currentUserEmail: string;
  users: User[];
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  completeSetup: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('kindernet_auth');
    const storedUsers = localStorage.getItem('kindernet_users');

    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(authData.isAuthenticated);
      setSetupComplete(authData.setupComplete);
      setCurrentUserEmail(authData.currentUserEmail);
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Create demo user if no users exist
      const demoUser = {
        email: 'demo@kindernet.com',
        password: 'demo123',
        name: 'Demo User',
        organizationSetup: true,
      };
      setUsers([demoUser]);
      localStorage.setItem('kindernet_users', JSON.stringify([demoUser]));
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated || currentUserEmail) {
      localStorage.setItem(
        'kindernet_auth',
        JSON.stringify({ isAuthenticated, setupComplete, currentUserEmail })
      );
    }
  }, [isAuthenticated, setupComplete, currentUserEmail]);

  // Save users to localStorage whenever it changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('kindernet_users', JSON.stringify(users));
    }
  }, [users]);

  const login = (email: string, password: string) => {
    const userExists = users.find(user => user.email === email && user.password === password);

    if (userExists) {
      setIsAuthenticated(true);
      setCurrentUserEmail(email);

      if (userExists.organizationSetup) {
        setSetupComplete(true);
        toast.success('Login successful! Welcome back.');
        navigate('/dashboard');
      } else {
        setSetupComplete(false);
        toast.success('Please complete organization setup to continue.');
        navigate('/setup');
      }
    } else {
      toast.error('Invalid credentials. User not found.');
    }
  };

  const signup = (name: string, email: string, password: string) => {
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      toast.error('User with this email already exists');
      return;
    }

    if (name && email && password) {
      const newUser = { email, password, name, organizationSetup: false };
      setUsers([...users, newUser]);
      setIsAuthenticated(true);
      setCurrentUserEmail(email);
      setSetupComplete(false);
      toast.success('Account created successfully!');
      navigate('/setup');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setSetupComplete(false);
    setCurrentUserEmail('');
    localStorage.removeItem('kindernet_auth');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const completeSetup = (data: any) => {
    setUsers(users.map(user =>
      user.email === currentUserEmail
        ? { ...user, organizationSetup: true }
        : user
    ));
    setSetupComplete(true);
    toast.success('Organization setup complete! Welcome to KINDERNET.');
    navigate('/dashboard');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setupComplete,
        currentUserEmail,
        users,
        login,
        signup,
        logout,
        completeSetup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};