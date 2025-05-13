import ProjectCard from "@/components/ProjectCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/Icon";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ExternalLinkCard } from "@/components/ExternalLink";
import { FollowButton } from "@/components/Buttons/FollowButton";
import { getFullUser } from "@/app/actions/getFullUser";

interface Props {
  params: { username: string };
}

export default async function ProfilePage({ params }: { params: Props["params"] }) {
  const currentUser = await getCurrentUser();

  let user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  const fullUser = await getFullUser({ user });

  if (!fullUser) return notFound();

  const totalLikes = fullUser.projects.reduce((sum, project) => sum + project._count.likes, 0);
  const isFollowing = currentUser 
    ? fullUser.followers.some(f => f.followerId === currentUser.id)
    : false;
  return (
   <main className="container mx-auto px-4 py-8">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white dark:border-gray-800 shadow-lg">
            <AvatarImage src={fullUser.avatarUrl || ''} />
            <AvatarFallback>
              {fullUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {fullUser.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">@{fullUser.username}</p>
            </div>

            {currentUser?.id === fullUser?.id && (
              <FollowButton userId={fullUser.id} isFollowing={isFollowing} />
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300">{fullUser.bio || "No bio yet."}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Icons.project className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{fullUser._count.projects}</span>
              <span className="text-gray-500">Projects</span>
            </div>

            <div className="flex items-center gap-1">
              <Icons.like className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{totalLikes}</span>
              <span className="text-gray-500">Likes</span>
            </div>

            <div className="flex items-center gap-1">
              <Icons.followers className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{fullUser._count.followers}</span>
              <span className="text-gray-500">Followers</span>
            </div>

            <div className="flex items-center gap-1">
              <Icons.following className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{fullUser._count.following}</span>
              <span className="text-gray-500">Following</span>
            </div>
          </div>

          {fullUser.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {fullUser.links.map((link) => (
                <ExternalLinkCard
                  key={link.id}
                  title={link.title}
                  url={link.url}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects
          </h2>
          {/* Optional: Show view all if needed */}
        </div>

        {fullUser.projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fullUser.projects.map((project) => (
              <ProjectCard
                key={project.id ?? Math.random()}
                project={{
                  ...project,
                  user: {
                    id: fullUser.id,
                    name: fullUser.name,
                    username: fullUser.username,
                    avatarUrl: fullUser.avatarUrl ?? null,
                  },
                  createdAt: project.createdAt.toString(),
                }}
                currentUserId={currentUser?.id ?? null}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icons.project className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No projects yet</h3>
            <p className="text-gray-500 mt-2">This user hasn't shared any projects.</p>
          </div>
        )}
      </section>
    </div>
  </main>
  );
}