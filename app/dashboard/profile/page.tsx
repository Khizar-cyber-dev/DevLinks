import getCurrentUser from '@/actions/getCurrentUser';
import getProjectByUserId from '@/actions/getProjectByUserId';

export default async function page() {
  const user = await getCurrentUser();
  const projects = await getProjectByUserId();
  console.log(projects);
  console.log(user);

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>{user.username}</p>
      <p>{user.email}</p>
      {projects?.map((project) => (
        <div key={project.id}>
          <p>
            {project.title}
          </p>
          <p>
            {project.description}
          </p>
          <div className="flex gap-2">
            {project.techStacks.map((tech) => (
              <span key={tech.id} className="bg-gray-200 px-2 py-1 rounded">
                {tech.name}
              </span>
            ))}
          </div>
          {project.imageUrl && <img src={project.imageUrl} alt={project.title} height={100} width={100}/>}
        </div>
      ))}
    </div>
  );
}
