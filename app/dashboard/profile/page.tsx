'use client';

import { useState, useEffect } from 'react';
import { FiEdit, FiLink, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'sonner';
import { Project, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import ProjectCard from '@/components/ProjectCard';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editData, setEditData] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    avatarUrl: ''
  });
  const [newLink, setNewLink] = useState({
    title: '',
    url: ''
  });
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userRes = await fetch('/api/user');
        const userData = await userRes.json();
        setUser(userData);
        setCurrentUser(userData);
        setEditData({
          name: userData.name,
          username: userData.username,
          email: userData.email,
          bio: userData.bio || '',
          avatarUrl: userData.avatarUrl || ''
        });

        const projectsResponse = await fetch('/api/project');
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUser({
          ...updatedUser,
          links: user?.links || []
        });
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const handleAddLink = async () => {
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLink),
      });

      if (response.ok) {
        const addedLink = await response.json();
        setUser(user => {
          if (!user) return user;
          return {
            ...user,
            links: [...(user.links || []), addedLink]
          };
        });
        setNewLink({ title: '', url: '' });
        setShowLinkForm(false);
        toast.success('Link added successfully!');
      } else {
        toast.error('Failed to add link');
      }
    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('Error adding link');
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    try {
      const response = await fetch('/api/links', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: linkId }),
      });
  
      if (response.ok) {
        setUser(prev => {
          if (!prev) return null;
          return {
            ...prev,
            links: (prev.links || []).filter(link => link.id !== linkId)
          };
        });
        toast.success('Link deleted successfully!');
      } else {
        toast.error('Failed to delete link');
      }
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('Error deleting link');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-gray-600">Failed to load profile data</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
            {isEditing && (
              <div className="absolute bottom-4 right-4">
                <input
                  type="text"
                  className="text-sm px-3 py-2 border rounded-lg bg-white/90 backdrop-blur-sm w-[200px] sm:w-auto"
                  placeholder="Cover photo URL"
                  value={editData.avatarUrl}
                  onChange={(e) => setEditData({ ...editData, avatarUrl: e.target.value })}
                />
              </div>
            )}
          </div>

        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="relative -mt-16">
                <Avatar className="h-24 w-24 rounded-full border-4 border-white bg-white">
                  <AvatarImage src={user.avatarUrl || 'https://avatar.vercel.sh/default'} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="text-xl sm:text-2xl font-bold w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                    <div className="flex items-center justify-center sm:justify-start">
                      <span className="text-gray-500 mr-2">@</span>
                      <input
                        type="text"
                        className="text-gray-600 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editData.username}
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">@{user.username}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full sm:w-auto text-center sm:text-right">
              <Button
                onClick={() => {
                  if (isEditing) {
                    handleUpdateProfile();
                  } else {
                    setIsEditing(true);
                  }
                }}
                variant={isEditing ? "default" : "outline"}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                {isEditing ? (
                  <>
                    <FiSave className="h-4 w-4" />
                    <span>Save</span>
                  </>
                ) : (
                  <>
                    <FiEdit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </Button>
            </div>
          </div>

            {isEditing ? (
              <textarea
                className="mt-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Tell us about yourself..."
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              />
            ) : (
              <p className="mt-4 text-gray-700 text-center sm:text-left">
                {user.bio || (
                  <span className="text-gray-400 italic">No bio yet. Add a bio to tell others about yourself.</span>
                )}
              </p>
            )}

            <div className="mt-4 flex items-center justify-center sm:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 break-all">{user.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-blue-500" />
                Links
              </h2>
              <Button
                onClick={() => setShowLinkForm(!showLinkForm)}
                variant="ghost"
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
              >
                {showLinkForm ? (
                  <>
                    <FiX className="h-4 w-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <FiLink className="h-4 w-4" />
                    <span>Add Link</span>
                  </>
                )}
              </Button>
            </div>

            {showLinkForm && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. My Portfolio"
                      value={newLink.title}
                      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <Button onClick={() => setShowLinkForm(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleAddLink} disabled={!newLink.title || !newLink.url}>
                    Add Link
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {(user.links || []).length > 0 ? (
                (user.links || []).map((link) => (
                  <div
                    key={link.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors gap-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <LinkIcon className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="max-w-full">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline font-medium break-words"
                        >
                          {link.title}
                        </a>
                        <p className="text-sm text-gray-500 break-words">{link.url}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeleteLink(link.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 self-end sm:self-auto"
                      title="Delete link"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
                  <FiLink className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-gray-500">No links added yet.</p>
                  <Button onClick={() => setShowLinkForm(true)} variant="ghost" className="mt-2 text-blue-500">
                    Add your first link
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Featured Projects</h1>
            <Link href="/dashboard/add-projects">
              <Button variant="outline" className="flex items-center gap-2">
                <FiEdit className="h-4 w-4" />
                Add Project
              </Button>
            </Link>
          </div>
          
          {projects.length > 0 ? (
            <div className="grid gap-6">
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
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first project.</p>
              <div className="mt-6">
                <Link href="/dashboard/add-projects">
                  <Button>
                    <FiEdit className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}