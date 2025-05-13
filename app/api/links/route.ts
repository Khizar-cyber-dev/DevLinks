import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { title, url } = body;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const newLink = await prisma.externalLink.create({
      data: {
        title,
        url,
        userId: user.id
      }
    });

    return NextResponse.json(newLink);
  } catch (error) {
    console.log("Link creation error:", error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Verifing the link belongs to the user before deleting
    const link = await prisma.externalLink.findFirst({
      where: {
        id,
        userId: user.id
      }
    });

    if (!link) {
      return new NextResponse('Link not found', { status: 404 });
    }

    await prisma.externalLink.delete({
      where: {
        id
      }
    });

    return new NextResponse('Link deleted', { status: 200 });
  } catch (error) {
    console.log("Link deletion error:", error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}