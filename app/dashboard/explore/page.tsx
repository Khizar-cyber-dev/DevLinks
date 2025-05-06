'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce'; 
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Edit, ExternalLink, Github, MoreVertical, Search } from 'lucide-react';
import { DeleteButton } from '@/components/DeleteButton';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Project } from '@/types';
import timeSince from '@/actions/getTimeOfProject';

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const searchType = 'tech';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && debouncedSearchTerm) {
      fetchProjects();
    } else {
      setProjects([]);
    }
  }, [debouncedSearchTerm, searchType, mounted]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/project/search?${searchType}=${encodeURIComponent(debouncedSearchTerm)}`
      );
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discover Projects</h1>
            <p className="text-muted-foreground mt-2">
              Browse through innovative projects shared by our community
            </p>
          </div>
          
          <div className="w-full md:w-auto">
          <Tabs>
            <TabsList>
              <TabsTrigger value="tech">Tech Stack</TabsTrigger>
            </TabsList>
          </Tabs>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`Search by 'technology (e.g. Next.js, Node.js)`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-3 w-[100px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id || project.title || `${project.user.name}-${project.createdAt}`} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      {project.user.avatarUrl && (
                        <AvatarImage 
                          src={project.user.avatarUrl} 
                          className="rounded-full"
                        />
                      )}
                      <AvatarFallback className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {project.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold leading-none">{project.user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {timeSince(new Date(project.createdAt))}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <Link href={`/dashboard/add-projects?projectId=${project.id}`}>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                        <DeleteButton projectId={project.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold line-clamp-2">{project.title}</h2>
                      <p className="text-muted-foreground line-clamp-3 mt-2">
                        {project.description}
                      </p>
                    </div>
                    
                    {project.imageUrl && (
                      <div className="rounded-lg overflow-hidden border">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStacks.map((tech) => (
                          <Tooltip key={tech.id}>
                            <TooltipTrigger>
                              <Badge variant="secondary" className="px-3 py-1 hover:bg-primary/10 transition-colors">
                                {tech.name}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Projects using {tech.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 flex-1"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span>Code</span>
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      className="gap-2 flex-1"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span>Demo</span>
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground max-w-md">
              {searchTerm 
                ? `Try a different search term or browse trending projects`
                : `Start by searching for projects by technology or username`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;