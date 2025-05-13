import prisma from '@/lib/db';

interface IParams {
  projectId: string;
}

export default async function getProjectById({ projectId }: IParams) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId, 
      },
      include: {
        techStacks: true,
      },
    });
    return project;
  } catch (err: any) {
    console.log('Message error:', err);
  }
};