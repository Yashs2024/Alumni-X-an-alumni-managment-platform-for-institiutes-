import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MessageSquare, Heart, Share2, Image as ImageIcon, Send } from 'lucide-react';
import { motion } from 'motion/react';

export const Feed = () => {
  const { user } = useAuth();
  const { posts, addPost } = useData();
  const [newPostContent, setNewPostContent] = useState('');

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    addPost({
      id: Math.random().toString(36).substr(2, 9),
      authorId: user!.id,
      authorName: user!.name,
      content: newPostContent,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
    });
    setNewPostContent('');
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
      className="space-y-8 max-w-3xl mx-auto"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Social Feed</h1>
        <p className="text-muted-foreground mt-1">Stay connected with your alumni network.</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="shadow-sm border-border">
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover border border-border" />
              <div className="flex-1 space-y-3">
                <textarea
                  className="w-full resize-none border-none focus:ring-0 p-0 text-foreground placeholder:text-muted-foreground bg-transparent"
                  placeholder="Share an update, opportunity, or ask a question..."
                  rows={3}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Photo
                  </Button>
                  <Button onClick={handlePost} disabled={!newPostContent.trim()} className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-6">
        {posts.map(post => (
          <motion.div key={post.id} variants={itemVariants}>
            <Card className="shadow-sm border-border hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-sm">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{post.authorName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(post.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-3">
                <p className="text-foreground/90 whitespace-pre-wrap">{post.content}</p>
                <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-border">
                  <button className="flex items-center text-sm text-muted-foreground hover:text-rose-500 transition-colors group">
                    <Heart className="h-4 w-4 mr-1.5 group-hover:fill-rose-500" />
                    {post.likes}
                  </button>
                  <button className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    {post.comments}
                  </button>
                  <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto">
                    <Share2 className="h-4 w-4 mr-1.5" />
                    Share
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
