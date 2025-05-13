import prisma from '@/lib/db';
import getCurrentUser from './getCurrentUser';

export async function getAllUser() {
    try {
        const users = await prisma.user.findMany();
        return users;
    }
    catch (err) {
        console.error('Error in getAllUser:', err);
        return null;
    }
};