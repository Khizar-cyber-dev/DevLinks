import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: Request, { params }: { params: { projectId: string } }) {
  const { projectId } = params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        techStacks: true, 
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { projectId: string } }) {
    const { projectId } = params;
  
    try {
      const reqBody = await req.json();
      const { title, description, techStacks, githubUrl, liveUrl, imageUrl } = reqBody;

      let finalImageUrl = imageUrl;
      if (typeof imageUrl === 'undefined') {
        const existingProject = await prisma.project.findUnique({
          where: { id: projectId },
          select: { imageUrl: true }
        });
        finalImageUrl = existingProject?.imageUrl ?? null;
      }

      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: {
          title: title as string,
          description: description as string,
          githubUrl: githubUrl ? (githubUrl as string) : null,
          liveUrl: liveUrl ? (liveUrl as string) : null,
          imageUrl: finalImageUrl,
        },
      });
  
      await prisma.techStack.deleteMany({
        where: { projectId },
      });
  
      await prisma.techStack.createMany({
        data: techStacks.map((name: string) => ({
          name: name.trim(),
          projectId,
        })),
      });
  
      return NextResponse.json({ success: true, project: updatedProject });
  
    } catch (error) {
      console.error('Update project error:', error);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
  }

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const project = await prisma.project.findUnique({
      where: { id: params.projectId },
    });

    if (!project) {
      return new NextResponse('Project not found', { status: 404 });
    }

    if (project.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prisma.bookmark.deleteMany({ where: { projectId: params.projectId } });
    await prisma.like.deleteMany({ where: { projectId: params.projectId } });
    await prisma.techStack.deleteMany({ where: { projectId: params.projectId } });

    await prisma.project.delete({
      where: { id: params.projectId },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('[PROJECTS_DELETE] Error:', error);
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