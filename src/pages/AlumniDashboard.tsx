import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Heart, MessageSquare, Users, ArrowRight, UserPlus, Calendar, IndianRupee } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const AlumniDashboard = () => {
  const { user } = useAuth();
  const { posts, mentorshipRequests, users, events } = useData();
  const { t } = useTranslation();

  const myRequests = mentorshipRequests.filter(req => req.mentorId === user?.id && req.status === 'Pending');
  const recentPosts = posts.slice(0, 2);
  const suggestedConnections = users.filter(u => u.role === 'Alumni' && u.id !== user?.id).slice(0, 3);
  const totalAlumni = users.filter(u => u.role === 'Alumni').length;

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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-1">Here is what's happening in your alumni network.</p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1 self-start md:self-auto bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none">Alumni</Badge>
      </motion.div>

      {/* Key Stats */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Total Alumni</p>
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">{totalAlumni}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Number of registered alumni</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">{events.length}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Events scheduled this year</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Mentors Available</p>
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">2</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Alumni offering mentorship</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Your Donations</p>
                <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
                  <IndianRupee className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">₹0</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Total amount contributed</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Suggested Connections */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">Suggested Connections</CardTitle>
              <CardDescription>Based on your profile, you might want to connect with these alumni.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {suggestedConnections.map(conn => (
                  <div key={conn.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <img src={conn.avatar} alt={conn.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{conn.name}</p>
                        <p className="text-xs text-muted-foreground">{conn.jobTitle} at {conn.company}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <UserPlus className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full text-primary hover:text-primary hover:bg-primary/5 border-primary/20" asChild>
                  <Link to="/directory">View all alumni</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Donations */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">Recent Donations</CardTitle>
              <CardDescription>Thank you to our recent donors.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-xs">
                      A
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Anonymous</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground">₹500</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-xs">
                      R
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Rajesh Kumar</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground">₹100</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-xs">
                      V
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Vikram Singh</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground">₹250</span>
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full text-primary hover:text-primary hover:bg-primary/5 border-primary/20" asChild>
                  <Link to="/donations">Make a donation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
