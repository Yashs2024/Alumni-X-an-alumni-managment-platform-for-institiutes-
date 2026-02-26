import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Users, Calendar, DollarSign, UserCheck, Check, X, Search, IndianRupee } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { users, events, pendingUsers, approveUser, rejectUser } = useData();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const totalAlumni = users.filter(u => u.role === 'Alumni').length;
  const totalStudents = users.filter(u => u.role === 'Student').length;
  const totalEvents = events.length;
  const fundsRaised = 12500; // Mock data

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome, Admin!</h1>
          <p className="text-muted-foreground mt-1">Here is an overview of the platform activity.</p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1 self-start md:self-auto bg-purple-100 text-purple-800 hover:bg-purple-200 border-none">Administrator</Badge>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Alumni Registered</p>
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
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                  <UserCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">{pendingUsers.length}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">New alumni registrations</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Events Created</p>
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">{totalEvents}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Total events on the platform</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">Active Mentorships</p>
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-foreground">1</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Total active mentorships</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Approvals Queue */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">Pending Approvals</CardTitle>
              <CardDescription>Review and approve new alumni registrations.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {pendingUsers.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No pending approvals.
                  </div>
                ) : (
                  pendingUsers.map(user => (
                    <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.batch}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => approveUser(user.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50" onClick={() => rejectUser(user.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Donations */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">Recent Donations</CardTitle>
              <CardDescription>A list of the most recent contributions.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-border">
                    <TableHead className="font-semibold text-foreground">Donor</TableHead>
                    <TableHead className="font-semibold text-foreground">Amount</TableHead>
                    <TableHead className="font-semibold text-foreground">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-foreground">Rajesh Kumar</TableCell>
                    <TableCell className="text-muted-foreground">₹100.00</TableCell>
                    <TableCell className="text-muted-foreground">6/6/2024</TableCell>
                  </TableRow>
                  <TableRow className="border-b-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-foreground">Aanya Gupta</TableCell>
                    <TableCell className="text-muted-foreground">₹50.00</TableCell>
                    <TableCell className="text-muted-foreground">6/5/2024</TableCell>
                  </TableRow>
                  <TableRow className="border-b-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-foreground">Vikram Singh</TableCell>
                    <TableCell className="text-muted-foreground">₹250.00</TableCell>
                    <TableCell className="text-muted-foreground">6/4/2024</TableCell>
                  </TableRow>
                  <TableRow className="border-b-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-foreground">Anonymous</TableCell>
                    <TableCell className="text-muted-foreground">₹500.00</TableCell>
                    <TableCell className="text-muted-foreground">6/3/2024</TableCell>
                  </TableRow>
                  <TableRow className="border-b-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-foreground">Arjun Mehta</TableCell>
                    <TableCell className="text-muted-foreground">₹75.00</TableCell>
                    <TableCell className="text-muted-foreground">6/2/2024</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
