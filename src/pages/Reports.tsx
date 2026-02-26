import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';

export const Reports = () => {
  const donationData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 2000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
    { name: 'Jul', amount: 3490 },
    { name: 'Aug', amount: 4200 },
    { name: 'Sep', amount: 3800 },
    { name: 'Oct', amount: 4500 },
    { name: 'Nov', amount: 5100 },
    { name: 'Dec', amount: 6200 },
  ];

  const registrationData = [
    { year: '2020', alumni: 120, students: 400 },
    { year: '2021', alumni: 150, students: 450 },
    { year: '2022', alumni: 200, students: 480 },
    { year: '2023', alumni: 280, students: 520 },
    { year: '2024', alumni: 350, students: 600 },
  ];

  const eventPopularityData = [
    { name: 'Annual Meet', attendees: 450 },
    { name: 'Tech Talk', attendees: 200 },
    { name: 'Career Fair', attendees: 350 },
    { name: 'Webinar', attendees: 150 },
    { name: 'Reunion', attendees: 300 },
  ];

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

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
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Detailed insights into platform performance and user engagement.</p>
        </div>
        <Button variant="outline" className="flex items-center border-border hover:bg-muted">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trends */}
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
          <Card className="border-border shadow-sm">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center text-xl font-semibold text-foreground">
                <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
                Monthly Donation Trends
              </CardTitle>
              <CardDescription>Total funds raised over the past year</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={donationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }} />
                  <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Registration Growth */}
        <motion.div variants={itemVariants} className="col-span-1">
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center text-xl font-semibold text-foreground">
                <Users className="mr-2 h-5 w-5 text-indigo-500" />
                Registration Growth
              </CardTitle>
              <CardDescription>Year over year growth of registered users</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={registrationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }} />
                  <Bar dataKey="alumni" name="Alumni" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="students" name="Students" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Event Popularity */}
        <motion.div variants={itemVariants} className="col-span-1">
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center text-xl font-semibold text-foreground">
                <Calendar className="mr-2 h-5 w-5 text-amber-500" />
                Event Popularity
              </CardTitle>
              <CardDescription>Distribution of attendees across event types</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventPopularityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="attendees"
                  >
                    {eventPopularityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
