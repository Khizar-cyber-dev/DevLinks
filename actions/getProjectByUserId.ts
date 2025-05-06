import prisma from '@/lib/db';
import getCurrentUser from './getCurrentUser';

export default async function getProjectByUserId(){
    try{
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        console.log('No current user found');
        return null;
    }
    const projects = await prisma.project.findMany({
        where: {
            userId: currentUser.id,
        },
        include: {
            techStacks: true
        }
    });
    console.log('Projects found for current user:', projects);
    return projects;
    }catch(e: any){
        console.log(e.message);
    }
}