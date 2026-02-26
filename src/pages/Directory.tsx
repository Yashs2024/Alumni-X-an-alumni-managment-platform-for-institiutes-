import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Search, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export const Directory = () => {
  const { users } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const alumni = users.filter(u => u.role === 'Alumni');
  
  const filteredAlumni = alumni.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Alumni Directory</h1>
          <p className="text-muted-foreground mt-1">Connect with graduates from your institution.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, company, or skills..." 
            className="pl-9 border-border bg-background focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-border hover:bg-muted">Filters</Button>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(person => (
          <motion.div key={person.id} variants={itemVariants}>
            <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 h-24 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors"></div>
                <div className="px-6 pb-6 relative">
                  <img 
                    src={person.avatar} 
                    alt={person.name} 
                    className="w-24 h-24 rounded-full border-4 border-background absolute -top-12 bg-muted object-cover shadow-sm"
                  />
                  <div className="mt-14">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{person.name}</h3>
                        <p className="text-sm font-medium text-muted-foreground mt-0.5">{person.jobTitle} at {person.company}</p>
                      </div>
                      {person.isMentor && (
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">Mentor</Badge>
                      )}
                    </div>
                    
                    <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{person.course} • Class of {person.batch}</span>
                      </div>
                      <div className="flex items-start">
                        <Briefcase className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground shrink-0" />
                        <span className="line-clamp-2">{person.skills?.join(', ')}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Connect</Button>
                      <Button variant="outline" className="flex-1 border-border hover:bg-muted">Message</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
