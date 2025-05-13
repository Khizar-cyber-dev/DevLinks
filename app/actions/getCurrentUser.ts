import prisma from '@/lib/db';
import { currentUser, User } from '@clerk/nextjs/server';

const getCurrentUser = async () => {
  try {
    const user: User | null = await currentUser();
    console.log('Clerk User:', user);

    if (!user) {
      console.log('No Clerk user found');
      return null;
    }

    const fetchedUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    console.log('Database User:', fetchedUser);

    if (!fetchedUser) {
      console.log('No database user found for clerkId:', user.id);
      return null;
    }

    return fetchedUser;
  } catch (err) {
    console.error('Error in getCurrentUser:', err);
    return null;
  }
};

export default getCurrentUser;
