import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'Student' | 'Alumni' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  course?: string;
  batch?: string;
  company?: string;
  jobTitle?: string;
  skills?: string[];
  isMentor?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: Role) => {
    // Mock login
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      course: 'B.Tech Computer Science',
      batch: '2024',
      company: role === 'Alumni' ? 'Tech Corp' : undefined,
      jobTitle: role === 'Alumni' ? 'Software Engineer' : undefined,
      skills: ['React', 'Node.js', 'Python'],
      isMentor: role === 'Alumni' ? true : false,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
