import prisma from '@/lib/db';
import getCurrentUser from './getCurrentUser';

export async function getBookmarkedProjects() {
  const user = await getCurrentUser();
  if (!user) return [];
  
  return prisma.project.findMany({
    where: {
      bookmarks: {
        some: {
          userId: user.id
        }
      }
    },
    include: {
      user: true,
      techStacks: true,
      bookmarks: {
        where: {
          userId: user.id
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};