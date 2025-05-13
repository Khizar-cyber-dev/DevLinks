import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId } = await request.json();
    
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_projectId: {
            userId: user.id,
            projectId,
          },
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      await prisma.like.create({
        data: {
          userId: user.id,
          projectId,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error in like API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!user || !projectId) {
      return NextResponse.json({ liked: false });
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId,
        },
      },
    });

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error('Error checking like status:', error);
    return NextResponse.json({ liked: false });
  }
}