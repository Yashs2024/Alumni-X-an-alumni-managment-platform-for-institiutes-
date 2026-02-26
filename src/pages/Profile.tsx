import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { UserCircle, Mail, Briefcase, GraduationCap, MapPin, Edit2, Save } from 'lucide-react';
import { motion } from 'motion/react';

export const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    jobTitle: user?.jobTitle || '',
    course: user?.course || '',
    batch: user?.batch || '',
    skills: user?.skills?.join(', ') || '',
    location: 'San Francisco, CA', // Mock
    bio: 'Passionate about technology and education. Always looking to connect with fellow alumni and mentor students.',
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, update user context/backend here
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
      className="space-y-8 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal and professional information.</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="col-span-1">
          <Card className="border-border shadow-sm h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative mb-6 group">
                <img src={user?.avatar} alt={user?.name} className="w-32 h-32 rounded-full border-4 border-background shadow-md bg-muted object-cover transition-transform duration-300 group-hover:scale-105" />
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2.5 rounded-full shadow-md hover:bg-primary/90 transition-colors hover:scale-110 active:scale-95">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
              <p className="text-sm font-medium text-muted-foreground mb-3">{user?.role}</p>
              <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 text-sm">{profileData.jobTitle}</Badge>
              
              <div className="w-full space-y-4 text-sm text-muted-foreground text-left mt-2 pt-6 border-t border-border">
                <div className="flex items-center group">
                  <div className="p-2 bg-muted rounded-md mr-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="truncate">{profileData.email}</span>
                </div>
                <div className="flex items-center group">
                  <div className="p-2 bg-muted rounded-md mr-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="truncate">{profileData.location}</span>
                </div>
                <div className="flex items-center group">
                  <div className="p-2 bg-muted rounded-md mr-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <span className="truncate">{profileData.company}</span>
                </div>
                <div className="flex items-center group">
                  <div className="p-2 bg-muted rounded-md mr-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <span className="truncate">{profileData.course}, {profileData.batch}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">About Me</CardTitle>
                <CardDescription>Update your details to help others find you.</CardDescription>
              </div>
              <Button 
                variant={isEditing ? "default" : "outline"} 
                size="sm" 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={isEditing ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border hover:bg-muted"}
              >
                {isEditing ? <><Save className="h-4 w-4 mr-2" /> Save Changes</> : <><Edit2 className="h-4 w-4 mr-2" /> Edit Profile</>}
              </Button>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Bio</label>
                {isEditing ? (
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow resize-y"
                    value={profileData.bio}
                    onChange={e => setProfileData({...profileData, bio: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-foreground/90 bg-muted/30 p-5 rounded-lg border border-border leading-relaxed">{profileData.bio}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Full Name</label>
                  <Input disabled={!isEditing} value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="border-border focus-visible:ring-primary disabled:opacity-70 disabled:bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Job Title</label>
                  <Input disabled={!isEditing} value={profileData.jobTitle} onChange={e => setProfileData({...profileData, jobTitle: e.target.value})} className="border-border focus-visible:ring-primary disabled:opacity-70 disabled:bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Company</label>
                  <Input disabled={!isEditing} value={profileData.company} onChange={e => setProfileData({...profileData, company: e.target.value})} className="border-border focus-visible:ring-primary disabled:opacity-70 disabled:bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Location</label>
                  <Input disabled={!isEditing} value={profileData.location} onChange={e => setProfileData({...profileData, location: e.target.value})} className="border-border focus-visible:ring-primary disabled:opacity-70 disabled:bg-muted/50" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-semibold text-foreground">Skills (comma separated)</label>
                  <Input disabled={!isEditing} value={profileData.skills} onChange={e => setProfileData({...profileData, skills: e.target.value})} className="border-border focus-visible:ring-primary disabled:opacity-70 disabled:bg-muted/50" />
                </div>
              </div>

              {!isEditing && (
                <div className="pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.split(',').map(skill => (
                      <Badge key={skill.trim()} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 border-none px-3 py-1.5">{skill.trim()}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
