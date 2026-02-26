import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Heart, TrendingUp, IndianRupee, Gift } from 'lucide-react';
import { motion } from 'motion/react';

export const Donations = () => {
  const { user } = useAuth();

  const platformStats = {
    totalRaised: 125000,
    donors: 450,
    projectsFunded: 12,
  };

  const personalHistory = [
    { id: '1', date: '2024-01-15', amount: 500, project: 'Scholarship Fund' },
    { id: '2', date: '2023-06-20', amount: 250, project: 'Library Renovation' },
  ];

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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Donations</h1>
        <p className="text-muted-foreground mt-1">Support your alma mater and track your contributions.</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-primary text-primary-foreground border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-primary-foreground/80 text-sm font-medium">Total Raised</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items-center">
                <IndianRupee className="h-8 w-8 mr-1 opacity-80" />
                {platformStats.totalRaised.toLocaleString()}
              </div>
              <p className="text-primary-foreground/80 text-sm mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> +15% this year
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-secondary text-secondary-foreground border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-secondary-foreground/80 text-sm font-medium">Active Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items-center">
                <Heart className="h-8 w-8 mr-2 opacity-80" />
                {platformStats.donors}
              </div>
              <p className="text-secondary-foreground/80 text-sm mt-2">Alumni giving back</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-accent text-accent-foreground border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-accent-foreground/80 text-sm font-medium">Projects Funded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items-center">
                <Gift className="h-8 w-8 mr-2 opacity-80" />
                {platformStats.projectsFunded}
              </div>
              <p className="text-accent-foreground/80 text-sm mt-2">Impacting student lives</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <Card className="h-full border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">Make a Donation</CardTitle>
              <CardDescription>Choose an amount and a cause to support.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-3 gap-3">
                {[50, 100, 250, 500, 1000].map(amount => (
                  <Button key={amount} variant="outline" className="h-12 text-lg font-medium border-border hover:bg-muted hover:text-foreground">
                    ₹{amount}
                  </Button>
                ))}
                <Input type="number" placeholder="Custom Amount" className="h-12 text-center text-lg border-border bg-background focus-visible:ring-primary" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select a Cause</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  <option>General Scholarship Fund</option>
                  <option>Campus Development</option>
                  <option>Research Grants</option>
                  <option>Student Emergency Fund</option>
                </select>
              </div>

              <Button className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90">
                Donate Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-xl font-semibold text-foreground">My Contribution History</CardTitle>
              <CardDescription>Thank you for your continued support, {user?.name.split(' ')[0]}!</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {personalHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto text-muted mb-3" />
                  <p>You haven't made any donations yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b-border">
                      <TableHead className="font-semibold text-foreground">Date</TableHead>
                      <TableHead className="font-semibold text-foreground">Project</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personalHistory.map((donation) => (
                      <TableRow key={donation.id} className="border-b-border hover:bg-muted/50 transition-colors">
                        <TableCell className="text-muted-foreground">{new Date(donation.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium text-foreground">{donation.project}</TableCell>
                        <TableCell className="text-right font-bold text-foreground">₹{donation.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
