import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const techStacks = JSON.parse(formData.get('techStacks') as string);
    const image = formData.get('image') as File | null;
    const githubUrl = formData.get('githubUrl') as string;
    const liveUrl = formData.get('liveUrl') as string;

    if (!title || !description) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    let imageUrl: string | null = null;
    if (image) {
      const buffer = await image.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageUrl = `data:${image.type};base64,${base64}`;
    }

    console.log({ githubUrl, liveUrl });

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        imageUrl,
        userId: user.id,
        ...(githubUrl && { githubUrl: githubUrl.trim() }),
        ...(liveUrl && { liveUrl: liveUrl.trim() }),
      },
    });

    if (techStacks.length > 0) {
      await prisma.techStack.createMany({
        data: techStacks.map((tech: string) => ({
          name: tech.trim(),
          projectId: project.id,
        })),
      });
    }

    const completeProject = await prisma.project.findUnique({
      where: { id: project.id },
      include: { techStacks: true },
    });

    return NextResponse.json(completeProject);
  } catch (error) {
    console.error('[PROJECTS_POST] Error:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id
      },
      include: {
        techStacks: true,
        user: true
      }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.log("Projects fetch error:", error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}