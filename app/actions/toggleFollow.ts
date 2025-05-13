'use server';

import prisma from '@/lib/db';
import getCurrentUser from './getCurrentUser';

export async function toggleFollow(followingId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('Not authenticated');

  if (currentUser.id === followingId) {
    throw new Error('Cannot follow yourself');
  }

  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId,
      },
    },
  });

  if (existingFollow) {
    await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });
    return { action: 'unfollow' };
  } else {
    await prisma.follow.create({
      data: {
        followerId: currentUser.id,
        followingId,
      },
    });
    return { action: 'follow' };
  }
}