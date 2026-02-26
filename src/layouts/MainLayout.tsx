import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Users, Briefcase, Calendar, MessageSquare, UserCircle, LogOut, Settings, Heart, Menu, X, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { Chatbot } from '../components/Chatbot';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: `/${user.role.toLowerCase()}` },
    { label: 'Directory', icon: Users, path: '/directory' },
    { label: 'Mentorship', icon: UserCircle, path: '/mentorship' },
    { label: 'Jobs & Internships', icon: Briefcase, path: '/jobs' },
    { label: 'Events', icon: Calendar, path: '/events' },
    { label: 'Social Feed', icon: MessageSquare, path: '/feed' },
    ...(user.role === 'Alumni' ? [{ label: 'Donations', icon: Heart, path: '/donations' }] : []),
    ...(user.role === 'Admin' ? [{ label: 'Reports', icon: Settings, path: '/reports' }] : []),
    { label: 'Profile', icon: UserCircle, path: '/profile' },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="hidden md:flex flex-col bg-card border-r border-border relative z-20"
      >
        <div className="p-4 border-b border-border flex items-center justify-between h-16">
          <div className={cn("flex items-center space-x-3 overflow-hidden", !isSidebarOpen && "justify-center w-full")}>
            <div className="w-8 h-8 shrink-0 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">X</div>
            {isSidebarOpen && <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl font-bold tracking-tight text-foreground whitespace-nowrap">AlumniX</motion.h1>}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute -right-4 top-20 bg-background border border-border rounded-full shadow-sm z-30 hidden md:flex h-8 w-8"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto overflow-x-hidden px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-md transition-colors group relative",
                  isSidebarOpen ? "px-3 py-2.5 space-x-3" : "p-2.5 justify-center",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                title={!isSidebarOpen ? t(item.label) : undefined}
              >
                <item.icon className={cn("shrink-0", isSidebarOpen ? "h-5 w-5" : "h-6 w-6", isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground")} />
                {isSidebarOpen && <span className="whitespace-nowrap">{t(item.label)}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          {isSidebarOpen ? (
            <>
              <div className="flex items-center space-x-3 mb-4">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{t(user.role)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <select 
                  className="text-xs border border-input rounded px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                  <option value="pa">PA</option>
                </select>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-muted" title={user.name} />
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10 w-10 text-muted-foreground hover:text-foreground">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="h-10 w-10 text-muted-foreground hover:text-destructive" title={t('Logout')}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-card border-r border-border flex flex-col z-50 md:hidden shadow-xl"
          >
            <div className="p-4 border-b border-border flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">X</div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">AlumniX</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-md transition-colors",
                      isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span>{t(item.label)}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3 mb-4">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-muted" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{t(user.role)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <select 
                  className="text-xs border border-input rounded px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                  <option value="pa">PA</option>
                </select>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Mobile Header */}
        <header className="md:hidden bg-card border-b border-border p-4 flex justify-between items-center h-16 shrink-0">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="-ml-2">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">X</div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Chatbot />
    </div>
  );
};
