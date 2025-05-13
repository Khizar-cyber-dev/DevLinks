'use client';

import React, { useState, useEffect } from 'react';

import { useDebounce } from '@/hooks/useDebounce'; 
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Project, User } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import { Search } from 'lucide-react';

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/user"); 
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setCurrentUser(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCurrentUser();
  }, []);

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
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="p-6 bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-3 w-[80px]" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </div>
                </div>

                {/* Content Skeleton */}
                <div className="p-6 space-y-4">
                  <Skeleton className="h-7 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  {/* Image placeholder */}
                  <Skeleton className="h-48 w-full rounded-lg" />

                  {/* Tech stack placeholders */}
                  <div>
                    <Skeleton className="h-4 w-[80px] mb-2" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-6 w-16 rounded-full" />
                      ))}
                    </div>
                  </div>

                  {/* Button placeholders */}
                  <div className="flex gap-3 pt-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
          ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-2 gap-8">
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