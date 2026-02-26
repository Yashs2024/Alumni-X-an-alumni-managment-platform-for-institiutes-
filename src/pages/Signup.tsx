import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, Role } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    branch: '',
    passingYear: '',
    bloodGroup: '',
    prn: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the user. Here we just log them in as Alumni.
    login(formData.email, 'Alumni');
    navigate('/alumni');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      <Card className="w-full max-w-2xl mt-8">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-sm">X</div>
          </div>
          <CardTitle className="text-2xl font-bold text-center tracking-tight">Join AlumniX</CardTitle>
          <CardDescription className="text-center">
            Create your alumni account to connect with the community.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Full Name</label>
              <Input name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Email Address</label>
              <Input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Phone Number</label>
              <Input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">College PRN</label>
              <Input name="prn" required value={formData.prn} onChange={handleChange} placeholder="e.g. 123456789" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Branch/Department</label>
              <Input name="branch" required value={formData.branch} onChange={handleChange} placeholder="e.g. Computer Science" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Batch/Passing Year</label>
              <Input name="passingYear" required value={formData.passingYear} onChange={handleChange} placeholder="e.g. 2020" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Blood Group</label>
              <select 
                name="bloodGroup" 
                value={formData.bloodGroup} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-foreground">Password</label>
              <Input name="password" type="password" required value={formData.password} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account? <Link to="/login/alumni" className="text-primary hover:underline">Log in</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
