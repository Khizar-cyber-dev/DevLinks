import prisma from '@/lib/db';
import getCurrentUser from './getCurrentUser';

export async function getAllUser() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.log('Unauthorized access attempt');
      return { error: 'Unauthorized access' };
    }

    console.log('Fetching all users...');
    
    const users = await prisma.user.findMany({
      include: {
        bookmarks: true,       
        links: true,         
        followers: true,       
        following: true,       
        projects: {           
          include: {
            techStacks: true,   
            bookmarks: true,   
            likes: true,       
            _count: {          
              select: { likes: true }
            }
          },
          orderBy: {
            createdAt: 'desc' 
          }
        },
        _count: {
          select: {
            projects: true,
            followers: true,
            following: true
          }
        }
      },
    });

    console.log('Fetched users:', users);

    return users; 
  } catch (err) {
    console.error('Error in getAllUser:', err); 
    return { error: 'Failed to fetch users' };
  }
}
