import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Calendar, Briefcase, UserCircle, ArrowRight, Search, Users, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { events, jobs, users } = useData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const mentors = users.filter(u => u.isMentor).slice(0, 2);
  const upcomingEvents = events.slice(0, 2);
  const recentJobs = jobs.slice(0, 3);
  const internshipsCount = jobs.filter(j => j.type === 'Internship').length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/directory');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Hi {user?.name.split(' ')[0]}, let's connect with alumni and opportunities.</h1>
          <p className="text-muted-foreground mt-1">Here is your personalized dashboard.</p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1 self-start md:self-auto bg-primary/10 text-primary hover:bg-primary/20 border-none">Student</Badge>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Mentors Available</p>
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <UserCircle className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">{mentors.length}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Alumni ready to help you</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">{events.length}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Connect and learn</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Internship Offers</p>
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                  <Briefcase className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">{internshipsCount}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Opportunities from alumni</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mentors Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">Mentors Available</CardTitle>
              <CardDescription>Connect with experienced alumni for guidance.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {mentors.map(mentor => (
                  <div key={mentor.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{mentor.name}</p>
                        <p className="text-xs text-muted-foreground">{mentor.jobTitle} at {mentor.company}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" asChild>
                      <Link to="/mentorship"><ArrowRight className="h-4 w-4" /></Link>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full text-primary hover:text-primary hover:bg-primary/5 border-primary/20" asChild>
                  <Link to="/mentorship">View all mentors</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Jobs Card */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">Jobs and Internships</CardTitle>
              <CardDescription>Career resources and opportunities.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentJobs.map(job => (
                  <div key={job.id} className="p-4 hover:bg-muted/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground text-base">{job.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span className="font-medium text-foreground/80">{job.company}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <Badge variant="secondary" className="font-normal text-xs bg-muted text-muted-foreground">{job.type}</Badge>
                      </div>
                    </div>
                    <Button size="sm" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link to="/jobs">Apply Now</Link>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full text-primary hover:text-primary hover:bg-primary/5 border-primary/20" asChild>
                  <Link to="/jobs">View all opportunities</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
