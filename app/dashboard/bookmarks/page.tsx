import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, ExternalLink, MoreVertical, Edit, Trash2 } from 'lucide-react';

import { LikeButton } from '@/components/LikeButton';
import { BookmarkButton } from '@/components/BookmarkButton';
import getCurrentUser from '@/actions/getCurrentUser';
import timeSince from '@/actions/getTimeOfProject';
import { getBookmarkedProjects } from '@/actions/getBookmarkedProjects';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

const BookmarksPage = async () => {
  const bookmarkedProjects = await getBookmarkedProjects();
  const currentUser = await getCurrentUser();

  if (bookmarkedProjects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Bookmarks</h1>
        <p className="text-muted-foreground">
          You haven't bookmarked any projects yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookmarks</h1>
      <div className="space-y-8">
        {bookmarkedProjects.map((project) => (
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
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
              </div>
            </div>
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
    </div>
  );
};

export default BookmarksPage;