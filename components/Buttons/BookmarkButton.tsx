'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Icons } from '../Icon';

interface BookmarkButtonProps {
  projectId: string;
  currentUserId: string | null;
}

export function BookmarkButton({ projectId, currentUserId }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!currentUserId) return;
      
      try {
        const response = await fetch(`/api/bookmark?projectId=${projectId}`);
        const data = await response.json();
        setIsBookmarked(data.bookmarked);
      } catch (error) {
        console.error('Error fetching bookmark status:', error);
      }
    };

    fetchBookmarkStatus();
  }, [projectId, currentUserId]);

  const handleBookmark = async () => {
    if (!currentUserId) {
      router.push('/');
      toast.info('Please sign in to bookmark projects');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });
      const data = await response.json();
      setIsBookmarked(data.bookmarked);
      toast.success(data.bookmarked ? 'Bookmarked!' : 'Removed bookmark');
    } catch (error) {
      console.error('Error updating bookmark:', error);
      toast.error('Failed to update bookmark');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={`gap-2 rounded-l-none hover:bg-muted/80 ${isBookmarked ? 'text-black' : ''}`}
      onClick={handleBookmark}
      disabled={isLoading}
    >
      <Icons.project className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
      <span className="sr-only md:not-sr-only">Save</span>
    </Button>
  );
}