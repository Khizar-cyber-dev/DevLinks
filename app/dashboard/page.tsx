
import Link from 'next/link';
import getAllProjects from '@/app/actions/getAllProjects';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { User } from '../generated/prisma';
import ProjectCard from '@/components/ProjectCard';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAllUser } from '../actions/getAllUser';

const Page = async () => {
  const currentUser = await getCurrentUser();
  let data = await getAllUser();
  const projects = await getAllProjects();
 
  const { userId } = await auth();
  if(!userId){
    redirect('/signIn');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Our Community</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.map((user: User) => {
            return (
              <Link
                key={user.username}
                href={`/dashboard/profile/${user.username}`}
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <Avatar className="h-16 w-16">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-center">@{user.username || user.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <Separator className="my-8" />

      <section>
        <h1 className="text-3xl font-bold mb-6">Featured Projects</h1>
        <div className="space-y-8">
          {projects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={{
                ...project,
                createdAt: project.createdAt.toString() 
              }}
              currentUserId={currentUser?.id ?? null}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;