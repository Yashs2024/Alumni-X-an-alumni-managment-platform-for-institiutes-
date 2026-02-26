import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { AlumniDashboard } from './pages/AlumniDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Directory } from './pages/Directory';
import { Mentorship } from './pages/Mentorship';
import { Jobs } from './pages/Jobs';
import { Feed } from './pages/Feed';
import { Events } from './pages/Events';
import { Donations } from './pages/Donations';
import { Profile } from './pages/Profile';
import { Reports } from './pages/Reports';
import './i18n';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="alumnix-theme">
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login/:roleParam" element={<Login />} />
              <Route path="/login" element={<Navigate to="/login/student" replace />} />
              <Route path="/" element={<MainLayout />}>
                <Route path="student" element={<StudentDashboard />} />
                <Route path="alumni" element={<AlumniDashboard />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="directory" element={<Directory />} />
                <Route path="mentorship" element={<Mentorship />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="events" element={<Events />} />
                <Route path="feed" element={<Feed />} />
                <Route path="donations" element={<Donations />} />
                <Route path="profile" element={<Profile />} />
                <Route path="reports" element={<Reports />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}


