import { getAllUser } from '@/actions/getAllUser';
import Link from 'next/link';
import getAllProjects from '@/actions/getAllProjects';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, ExternalLink, Edit, MoreVertical, Trash2 } from 'lucide-react';
import getCurrentUser from '@/actions/getCurrentUser';
import { User } from '../generated/prisma';
import timeSince from '@/actions/getTimeOfProject';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LikeButton } from '@/components/LikeButton';
import { BookmarkButton } from '@/components/BookmarkButton';
import { DeleteButton } from '@/components/DeleteButton';
import prisma from '@/lib/db';

const Page = async () => {
  const data = await getAllUser();
  const projects = await getAllProjects();
  const currentUser = await getCurrentUser();
  const project = await prisma.project.findMany({
    include: {
      techStacks: true,
    },
  });
  console.log(project);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Community Section */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Our Community</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.map((user: User) => {
            const slug = user.username || user.name.replace(/\s+/g, '-').toLowerCase();
            return (
              <Link
                key={user.username || user.name}
                href={`/dashboard/profile/${slug}`}
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

      {/* Projects Section */}
      <section>
        <h1 className="text-3xl font-bold mb-6">Featured Projects</h1>
        <div className="space-y-8">
          {projects?.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Header with User Info */}
              <div className="p-6 bg-muted/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    {project.user.avatarUrl && <AvatarImage src={project.user.avatarUrl} />}
                    <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{project.user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {timeSince(new Date(project.createdAt))}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex border rounded-md divide-x">
                     <LikeButton 
                      projectId={project.id} 
                      currentUserId={currentUser?.id ?? null} 
                    />
                    <BookmarkButton 
                        projectId={project.id} 
                        currentUserId={currentUser?.id ?? null} 
                    />
                  </div>
                  
                  {currentUser?.id === project.user.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-2">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <Link href={`/dashboard/add-projects?projectId=${project.id}`}>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                            >
                              <Edit className='mr-2 h-4 w-4' />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                            <DeleteButton projectId={project.id}/>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-muted-foreground mb-6">{project.description}</p>

                {/* Project Image */}
                {project.imageUrl && (
                  <div className="mb-6 rounded-lg overflow-hidden border">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStacks.map((tech) => (
                      <Badge key={tech.id} variant="secondary" className="px-3 py-1">
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <Button variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        <span>View Code</span>
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Demo</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;