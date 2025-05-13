import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; 

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tech = searchParams.get('tech');

    if (!tech) {
      return NextResponse.json({ message: 'Missing tech query parameter' }, { status: 400 });
    }

    const projects = await prisma.project.findMany({
      where: {
        techStacks: {
          some: {
            name: {
              contains: tech.toLowerCase(), 
            },
          },
        },
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            avatarUrl: true,
          },
        },
        techStacks: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('[SEARCH_PROJECTS_ERROR]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}