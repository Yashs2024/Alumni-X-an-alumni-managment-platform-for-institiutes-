import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from './AuthContext';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendees: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
  postedBy: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  studentName: string;
  mentorId: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  message: string;
}

interface DataContextType {
  events: Event[];
  jobs: Job[];
  posts: Post[];
  users: User[];
  mentorshipRequests: MentorshipRequest[];
  addPost: (post: Post) => void;
  addEvent: (event: Event) => void;
  addJob: (job: Job) => void;
  requestMentorship: (request: MentorshipRequest) => void;
  updateMentorshipStatus: (id: string, status: 'Accepted' | 'Rejected') => void;
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
  pendingUsers: User[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Annual Alumni Meet 2024', date: '2024-12-15', location: 'Main Campus Auditorium', description: 'Join us for the biggest alumni gathering of the year.', attendees: ['1', '2'] },
    { id: '2', title: 'Tech Talk: AI in 2025', date: '2024-11-20', location: 'Virtual', description: 'A deep dive into the future of AI with industry experts.', attendees: [] },
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    { id: '1', title: 'Software Engineering Intern', company: 'Google', location: 'Bangalore', type: 'Internship', postedBy: 'Rohan' },
    { id: '2', title: 'Product Manager', company: 'Microsoft', location: 'Hyderabad', type: 'Full-time', postedBy: 'Anita' },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    { id: '1', authorId: 'alumni1', authorName: 'Rohan Sharma', content: 'Excited to announce that our team at Google just launched a new feature! Happy to mentor any students interested in web dev.', likes: 15, comments: 3, timestamp: new Date().toISOString() },
    { id: '2', authorId: 'student1', authorName: 'Priya Patel', content: 'Looking for tips on cracking the PM interview. Any alumni willing to chat?', likes: 5, comments: 2, timestamp: new Date().toISOString() },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 'alumni1', name: 'Rohan Sharma', email: 'rohan@example.com', role: 'Alumni', company: 'Google', jobTitle: 'Senior SWE', skills: ['React', 'Node.js'], isMentor: true, course: 'B.Tech CS', batch: '2019' },
    { id: 'alumni2', name: 'Anita Desai', email: 'anita@example.com', role: 'Alumni', company: 'Microsoft', jobTitle: 'Product Manager', skills: ['Product', 'Strategy'], isMentor: true, course: 'MBA', batch: '2018' },
    { id: 'student1', name: 'Priya Patel', email: 'priya@example.com', role: 'Student', course: 'MBA', batch: '2025', skills: ['Marketing', 'Data Analysis'] },
  ]);

  const [pendingUsers, setPendingUsers] = useState<User[]>([
    { id: 'pending1', name: 'Vikram Singh', email: 'vikram@example.com', role: 'Alumni', company: 'Amazon', jobTitle: 'SDE II', course: 'B.Tech CS', batch: '2020' }
  ]);

  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>([
    { id: '1', studentId: 'student1', studentName: 'Priya Patel', mentorId: 'alumni1', status: 'Pending', message: 'Hi Rohan, I would love to get some guidance on software engineering interviews.' }
  ]);

  const addPost = (post: Post) => setPosts([post, ...posts]);
  const addEvent = (event: Event) => setEvents([...events, event]);
  const addJob = (job: Job) => setJobs([...jobs, job]);
  const requestMentorship = (request: MentorshipRequest) => setMentorshipRequests([...mentorshipRequests, request]);
  
  const updateMentorshipStatus = (id: string, status: 'Accepted' | 'Rejected') => {
    setMentorshipRequests(mentorshipRequests.map(req => req.id === id ? { ...req, status } : req));
  };

  const approveUser = (id: string) => {
    const user = pendingUsers.find(u => u.id === id);
    if (user) {
      setUsers([...users, user]);
      setPendingUsers(pendingUsers.filter(u => u.id !== id));
    }
  };

  const rejectUser = (id: string) => {
    setPendingUsers(pendingUsers.filter(u => u.id !== id));
  };

  return (
    <DataContext.Provider value={{ events, jobs, posts, users, mentorshipRequests, addPost, addEvent, addJob, requestMentorship, updateMentorshipStatus, approveUser, rejectUser, pendingUsers }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
