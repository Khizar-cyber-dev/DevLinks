'use client'

import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from './Icon';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Project } from '@/types';
import { LikeButton } from './Buttons/LikeButton';
import { BookmarkButton } from './Buttons/BookmarkButton';
import { DeleteButton } from './Buttons/DeleteButton';
import timeSince from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  currentUserId: string | null;
}

const ProjectCard = ({ project, currentUserId }: ProjectCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 bg-muted/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/profile/${project?.user?.username}`}>
            <Avatar>
              {project.user.avatarUrl && <AvatarImage src={project.user.avatarUrl} />}
              <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <h3 className="font-semibold">{project.user.name}</h3>
            <p className="text-sm text-muted-foreground">
              {timeSince(new Date(project.createdAt))}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border rounded-md divide-x">
            <LikeButton projectId={project.id} currentUserId={currentUserId} />
            <BookmarkButton projectId={project.id} currentUserId={currentUserId} />
          </div>

          {currentUserId === project.user.id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Icons.menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <Link href={`/dashboard/add-projects?projectId=${project.id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Icons.edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <DeleteButton projectId={project.id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-muted-foreground mb-6">{project.description}</p>

        {project.imageUrl && (
          <div className="mb-6 rounded-lg overflow-hidden border">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        <div className="mb-6">
          <h4 className="font-medium mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStacks.map((tech) => (
              <Badge key={tech.id || tech.name} variant="secondary" className="px-3 py-1">
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <Button
              variant="outline"
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Icons.github className="h-4 w-4" />
                <span>View Code</span>
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button
              asChild
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Icons.otherLinks className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;