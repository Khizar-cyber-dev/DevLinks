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
    
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId,
        },
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          userId_projectId: {
            userId: user.id,
            projectId,
          },
        },
      });
      return NextResponse.json({ bookmarked: false });
    } else {
      await prisma.bookmark.create({
        data: {
          userId: user.id,
          projectId,
        },
      });
      return NextResponse.json({ bookmarked: true });
    }
  } catch (error) {
    console.error('Error in bookmark API:', error);
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
      return NextResponse.json({ bookmarked: false });
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId,
        },
      },
    });

    return NextResponse.json({ bookmarked: !!bookmark });
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    return NextResponse.json({ bookmarked: false });
  }
}
