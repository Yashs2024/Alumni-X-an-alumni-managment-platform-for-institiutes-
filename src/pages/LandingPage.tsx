import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/Dialog';
import { GraduationCap, Users, Briefcase, Calendar, ArrowRight, Heart, Mail, Phone, MapPin, CheckCircle2, Globe, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const LandingPage = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleRoleSelect = (role: string) => {
    setIsLoginDialogOpen(false);
    navigate(`/login/${role.toLowerCase()}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">AlumniX</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:flex items-center space-x-2 mr-2 text-sm font-medium text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>En/Hi</span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground mr-1 sm:mr-0">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="outline" className="hidden sm:flex" onClick={() => setIsLoginDialogOpen(true)}>Login</Button>
              <Button asChild><Link to="/signup">Sign Up</Link></Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-6 border border-secondary/20">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-sm font-medium tracking-wide uppercase">The New Standard</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                Cultivate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Lifelong</span><br />
                Connections
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed font-light">
                An exclusive platform designed to bridge the gap between ambitious students and distinguished alumni. Build your legacy.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" asChild>
                  <Link to="/signup">Join the Network <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-transparent border-border hover:bg-muted transition-all" asChild>
                  <Link to="/login/student">Sign In</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-[2rem] transform rotate-2 scale-105 -z-10 blur-2xl"></div>
              <div className="relative w-full h-full max-h-[550px] rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 bg-card">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
                  alt="Graduates throwing caps" 
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply dark:mix-blend-screen"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why AlumniX Section */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-foreground mb-6">A Network of Excellence</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground leading-relaxed font-light">
              AlumniX is a centralized digital platform designed to connect alumni, students, and institutions. It simplifies alumni data management, fosters engagement, and strengthens lifelong connections.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-32 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Pillars of the Platform</h2>
            <p className="text-xl text-muted-foreground font-light">Everything you need to build a thriving alumni community.</p>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Users, title: "Alumni Directory", desc: "Search and connect with distinguished alumni across batches and courses.", color: "text-primary", bg: "bg-primary/5" },
              { icon: Calendar, title: "Exclusive Events", desc: "Organize and RSVP to high-profile virtual and in-person alumni gatherings.", color: "text-secondary", bg: "bg-secondary/10" },
              { icon: GraduationCap, title: "Mentorship", desc: "Alumni guide ambitious students and recent graduates toward career success.", color: "text-primary", bg: "bg-primary/5" },
              { icon: Heart, title: "Philanthropy", desc: "Enable secure, transparent fundraising for institutional development.", color: "text-secondary", bg: "bg-secondary/10" }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} className="p-8 bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="h-7 w-7 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose AlumniX Section */}
      <section className="py-32 bg-muted/30 overflow-hidden border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/5 transform -rotate-3 rounded-3xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop" 
                alt="Community" 
                className="rounded-3xl shadow-2xl border border-border/50 grayscale-[20%]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-foreground mb-10">The AlumniX Advantage</motion.h2>
              <div className="space-y-8">
                {[
                  "Fosters stronger alumni engagement and community building.",
                  "Creates exclusive opportunities for mentorship and internships.",
                  "Streamlines prestigious event organization and fundraising.",
                  "Provides a secure, dedicated space for your institution's elite network."
                ].map((point, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-start group">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                    </div>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed pt-0.5">{point}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeInUp} className="mt-12">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" asChild>
                  <Link to="/signup">Establish Your Presence</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-10">Inquire About AlumniX</h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground uppercase tracking-wider">Name</label>
                  <input type="text" className="w-full h-14 px-4 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground uppercase tracking-wider">Email</label>
                  <input type="email" className="w-full h-14 px-4 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="your.email@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground uppercase tracking-wider">Message</label>
                  <textarea className="w-full p-4 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary outline-none transition-all min-h-[160px]" placeholder="How can we assist your institution?"></textarea>
                </div>
                <Button size="lg" className="w-full h-14 text-lg rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">Send Inquiry</Button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col justify-center space-y-12 lg:pl-16"
            >
              <div className="flex items-start group">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Direct Correspondence</h3>
                  <p className="text-muted-foreground text-lg font-light">contact@alumnix.com</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Telephone</h3>
                  <p className="text-muted-foreground text-lg font-light">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Headquarters</h3>
                  <p className="text-muted-foreground text-lg font-light">123 Innovation Drive<br />Tech City, TC 90210</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-20 border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-secondary-foreground font-bold text-2xl shadow-lg">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <span className="text-3xl font-bold tracking-tight text-primary-foreground font-serif">AlumniX</span>
              </div>
              <p className="text-primary-foreground/70 leading-relaxed font-light text-lg">
                Connecting Students, Alumni & Institutions for a Stronger Future.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-8">Platform</h4>
              <ul className="space-y-4 font-light">
                <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Alumni Directory</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Event Management</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Mentorship</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Philanthropy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-8">Institution</h4>
              <ul className="space-y-4 font-light">
                <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Our Mission</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Terms of Use</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-8">Location</h4>
              <p className="text-primary-foreground/70 mb-8 font-light leading-relaxed">
                Punjab<br />
                Chandigarh, India
              </p>
              <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-6">Contact</h4>
              <p className="text-primary-foreground/70 mb-3 flex items-center font-light"><Mail className="h-4 w-4 mr-3 text-secondary" /> alumnix@gmail.com</p>
              <p className="text-primary-foreground/70 flex items-center font-light"><Phone className="h-4 w-4 mr-3 text-secondary" /> +91 9876543210</p>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-foreground/50 mb-4 md:mb-0 font-light">
              © {new Date().getFullYear()} AlumniX. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/50 font-light">
              Built by Students for Students & Alumni
            </p>
          </div>
        </div>
      </footer>

      {/* Login Role Selection Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-2xl w-[95vw] sm:w-full">
          <div className="p-6 sm:p-8">
            <DialogHeader className="mb-6 sm:mb-8">
              <DialogTitle className="text-center text-2xl sm:text-3xl font-bold">Choose Your Role</DialogTitle>
              <p className="text-center text-sm sm:text-base text-muted-foreground mt-2">Select how you'd like to log in to the AlumniX platform.</p>
            </DialogHeader>
            <div className="grid gap-4">
              <Button variant="outline" className="h-auto py-4 text-lg justify-start px-4 sm:px-6 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all group whitespace-normal" onClick={() => handleRoleSelect('Student')}>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-foreground">Student Login</div>
                  <div className="text-sm text-muted-foreground font-normal mt-1">Connect with mentors and find resources.</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 text-lg justify-start px-4 sm:px-6 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all group whitespace-normal" onClick={() => handleRoleSelect('Alumni')}>
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shrink-0">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-foreground">Alumni Login</div>
                  <div className="text-sm text-muted-foreground font-normal mt-1">Give back, connect with peers, and stay involved.</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 text-lg justify-start px-4 sm:px-6 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all group whitespace-normal" onClick={() => handleRoleSelect('Admin')}>
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shrink-0">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-foreground">Admin Login</div>
                  <div className="text-sm text-muted-foreground font-normal mt-1">Manage events, data, and platform settings.</div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
