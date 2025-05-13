export interface MinimalUser {
    name: string;
    username: string | null;
  }
  
  export interface User {
    id: string;
    clerkId: string;
    name: string;
    username: string | null;
    email: string;
    password?: string;
    bio?: string;
    avatarUrl?: string;
    projects?: Project[];
    likes?: Like[];
    bookmarks?: Bookmark[];
    links?: Link[];
    followers?: Follow[];
    following?: Follow[];
    createdAt: string;
  }
    
  export  interface Project {
      id: string;
      title: string;
      description: string;
      imageUrl: string | null;
      viewCount: number;
      githubUrl: string | null;
      liveUrl: string | null;
      createdAt: string;
      user: {
        id: string;
        username: string;
        name: string;
        avatarUrl: string | null;
      };
      techStacks: {
        id: string;
        name: string;
      }[];
    }
    
    export interface TechStack {
      id: string;
      name: string;
      project: Project;
      projectId: string;
    }
    
    export interface Like {
      id: string;
      user: User;
      userId: string;
      project: Project;
      projectId: string;
      createdAt: string;
    }
    
    export interface Follow {
      id: string;
      follower: User;
      followerId: string;
      following: User;
      followingId: string;
      createdAt: string;
    }
    
    export interface Bookmark {
      id: string;
      user: User;
      userId: string;
      project: Project;
      projectId: string;
      createdAt: string;
    }
    
    export interface Link {
      id: string;
      title: string;
      url: string;
      user: User;
      userId: string;
    }