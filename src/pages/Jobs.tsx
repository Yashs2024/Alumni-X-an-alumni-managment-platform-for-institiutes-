import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Briefcase, MapPin, Building, Search, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export const Jobs = () => {
  const { user } = useAuth();
  const { jobs, addJob } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', location: '', type: 'Full-time' });

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({
      id: Math.random().toString(36).substr(2, 9),
      ...newJob,
      postedBy: user!.name,
    } as any);
    setIsDialogOpen(false);
    setNewJob({ title: '', company: '', location: '', type: 'Full-time' });
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
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Jobs & Internships</h1>
          <p className="text-muted-foreground mt-1">Explore career opportunities posted by the alumni network.</p>
        </div>
        {user?.role === 'Alumni' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Post a Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Post a Job</DialogTitle>
                <DialogDescription>Share a career opportunity with the community.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePostJob} className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Job Title</label>
                  <Input required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} placeholder="e.g. Software Engineer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company</label>
                  <Input required value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} placeholder="e.g. Google" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <Input required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} placeholder="e.g. Bangalore, Remote" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Job Type</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    value={newJob.type}
                    onChange={e => setNewJob({...newJob, type: e.target.value})}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">Post Job</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search jobs by title, company, or location..." 
          className="pl-9 max-w-md border-border bg-background focus-visible:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <motion.div key={job.id} variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow flex flex-col h-full border-border">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
                    {job.company.charAt(0)}
                  </div>
                  <Badge variant={job.type === 'Internship' ? 'secondary' : 'default'} className={job.type === 'Internship' ? 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-none' : 'bg-primary/10 text-primary hover:bg-primary/20 border-none'}>
                    {job.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-foreground">{job.title}</CardTitle>
                <CardDescription className="text-base font-medium text-foreground/80 mt-1">{job.company}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
                  Posted by {job.postedBy}
                </div>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Apply Now</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
