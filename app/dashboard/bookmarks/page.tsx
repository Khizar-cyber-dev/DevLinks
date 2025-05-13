import getCurrentUser from '@/app/actions/getCurrentUser';
import { getBookmarkedProjects } from '@/app/actions/getBookmarkedProjects';
import ProjectCard from '@/components/ProjectCard';

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
    </div>
  );
};

export default BookmarksPage;