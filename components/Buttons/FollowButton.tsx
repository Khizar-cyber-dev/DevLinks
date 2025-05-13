'use client';

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toggleFollow } from "@/app/actions/toggleFollow";

export function FollowButton({
  userId,
  isFollowing,
}: {
  userId: string;
  isFollowing: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

const handleFollow = async () => {
  setIsLoading(true);

  try {
    await toggleFollow(userId);
    router.refresh();
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

  return (
    <Button 
      className="gap-2"
      onClick={handleFollow}
      disabled={isLoading}
      variant={isFollowing ? 'outline' : 'default'}
    >
      <Icons.follow className="h-4 w-4" />
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}