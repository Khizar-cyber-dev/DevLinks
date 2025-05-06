import prisma from '@/lib/db';

export async function getAllUser() {
    try {
        const users = await prisma.user.findMany();
        return users;
    }
    catch (err) {
        console.error('Error in getAllUser:', err);
        return null;
    }
}