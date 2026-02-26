import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Check, X, UserCircle, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const Mentorship = () => {
  const { user } = useAuth();
  const { users, mentorshipRequests, updateMentorshipStatus, requestMentorship } = useData();
  const [activeTab, setActiveTab] = useState('find');

  const mentors = users.filter(u => u.isMentor && u.id !== user?.id);
  const myRequestsAsStudent = mentorshipRequests.filter(req => req.studentId === user?.id);
  const myRequestsAsMentor = mentorshipRequests.filter(req => req.mentorId === user?.id);

  const handleRequest = (mentorId: string) => {
    requestMentorship({
      id: Math.random().toString(36).substr(2, 9),
      studentId: user!.id,
      studentName: user!.name,
      mentorId,
      status: 'Pending',
      message: 'I would like to request mentorship from you.',
    });
    alert('Mentorship request sent!');
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
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Mentorship Program</h1>
        <p className="text-muted-foreground mt-1">Connect with experienced alumni for guidance and support.</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="find" className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Find a Mentor</TabsTrigger>
            <TabsTrigger value="requests" className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">My Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="find" className="mt-8">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map(mentor => (
                <motion.div key={mentor.id} variants={itemVariants}>
                  <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <img src={mentor.avatar} alt={mentor.name} className="w-14 h-14 rounded-full border-2 border-background shadow-sm object-cover" />
                          <div>
                            <CardTitle className="text-lg text-foreground">{mentor.name}</CardTitle>
                            <CardDescription className="font-medium mt-0.5">{mentor.jobTitle} at {mentor.company}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {mentor.skills?.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs bg-muted text-muted-foreground hover:bg-muted/80 border-none">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-border">
                        <Button 
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                          onClick={() => handleRequest(mentor.id)}
                          disabled={myRequestsAsStudent.some(req => req.mentorId === mentor.id)}
                          variant={myRequestsAsStudent.some(req => req.mentorId === mentor.id) ? "outline" : "default"}
                        >
                          {myRequestsAsStudent.some(req => req.mentorId === mentor.id) ? 'Request Sent' : 'Request Mentorship'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="requests" className="mt-8 space-y-8">
            {user?.role === 'Alumni' && (
              <motion.div variants={itemVariants}>
                <Card className="border-border shadow-sm">
                  <CardHeader className="border-b border-border pb-4">
                    <CardTitle className="text-xl font-semibold text-foreground">Incoming Requests</CardTitle>
                    <CardDescription>Students seeking your mentorship</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    {myRequestsAsMentor.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">No incoming requests.</p>
                    ) : (
                      myRequestsAsMentor.map(req => (
                        <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-background rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                          <div className="mb-4 sm:mb-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <UserCircle className="h-6 w-6" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{req.studentName}</h4>
                                <Badge variant={req.status === 'Pending' ? 'outline' : req.status === 'Accepted' ? 'secondary' : 'destructive'} className={req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800 border-none' : req.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-none' : 'bg-rose-100 text-rose-800 border-none'}>
                                  {req.status}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground flex items-start mt-3 bg-muted/50 p-3 rounded-md">
                              <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                              <span className="italic">"{req.message}"</span>
                            </p>
                          </div>
                          {req.status === 'Pending' && (
                            <div className="flex space-x-3 sm:ml-6">
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => updateMentorshipStatus(req.id, 'Accepted')}>
                                <Check className="h-4 w-4 mr-1.5" /> Accept
                              </Button>
                              <Button size="sm" variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700" onClick={() => updateMentorshipStatus(req.id, 'Rejected')}>
                                <X className="h-4 w-4 mr-1.5" /> Decline
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <Card className="border-border shadow-sm">
                <CardHeader className="border-b border-border pb-4">
                  <CardTitle className="text-xl font-semibold text-foreground">My Requests</CardTitle>
                  <CardDescription>Status of your mentorship requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {myRequestsAsStudent.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">You haven't sent any requests.</p>
                  ) : (
                    myRequestsAsStudent.map(req => {
                      const mentor = users.find(u => u.id === req.mentorId);
                      return (
                        <div key={req.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-4">
                            <img src={mentor?.avatar} alt={mentor?.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                            <div>
                              <h4 className="font-semibold text-foreground">{mentor?.name}</h4>
                              <p className="text-xs font-medium text-muted-foreground mt-0.5">{mentor?.jobTitle} at {mentor?.company}</p>
                            </div>
                          </div>
                          <Badge variant={req.status === 'Pending' ? 'outline' : req.status === 'Accepted' ? 'secondary' : 'destructive'} className={req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800 border-none' : req.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-none' : 'bg-rose-100 text-rose-800 border-none'}>
                            {req.status}
                          </Badge>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};
