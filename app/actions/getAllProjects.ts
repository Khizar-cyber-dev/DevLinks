import prisma from '@/lib/db';

export default async function getAllProjects(){
    try{
        const getAllProjects = await prisma.project.findMany({
            include: {
                techStacks: true,
                user: true,
            }
        });
        return getAllProjects;
    }catch(e: any){
        console.log(e.message);
    }
}