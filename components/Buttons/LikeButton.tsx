'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '../Icon';

interface LikeButtonProps {
  projectId: string;
  currentUserId: string | null;
}

export function LikeButton({ projectId, currentUserId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchLikeStatus = useCallback(async () => {
    if (currentUserId) {
      try {
        const response = await fetch(`/api/like?projectId=${projectId}`);
        const data = await response.json();
        setIsLiked(data.liked);
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    }
  }, [projectId, currentUserId]);

  useEffect(() => {
    fetchLikeStatus();
  }, [fetchLikeStatus]);

  const handleLike = useCallback(async () => {
    if (!currentUserId) {
      router.push('/');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });
      const data = await response.json();
      setIsLiked(data.liked);
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId, currentUserId, router]);

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={`gap-2 rounded-r-none hover:bg-muted/80 ${isLiked ? 'text-red-500' : ''}`}
      onClick={handleLike}
      disabled={isLoading}
    >
      <Icons.like className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
      <span className="sr-only md:not-sr-only">Like</span>
    </Button>
  );
}