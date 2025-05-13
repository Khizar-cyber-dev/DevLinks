import prisma from "@/lib/db";

export async function getFullUser({ user }: any ){
    const fullUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { 
          projects: {
            include: {
              techStacks: true,
              likes: true,
              bookmarks: true,
              _count: {
                select: { likes: true }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          }, 
          links: true,
          followers: true,
          following: true,
          _count: {
            select: {
              projects: true,
              followers: true,
              following: true
            }
          }
        },
      });
      return fullUser;
}