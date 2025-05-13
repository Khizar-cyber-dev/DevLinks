import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, username, email, bio, avatarUrl } = body;

    const updatedUser = await prisma.user.update({
      where: {
        clerkId: userId
      },
      data: {
        name,
        username,
        email,
        bio,
        avatarUrl
      },
      include: {
        links: true 
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("Profile update error:", error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}