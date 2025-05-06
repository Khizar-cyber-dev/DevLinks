// import prisma from "@/lib/db";
// import { notFound } from "next/navigation";

// interface Props {
//   params: { username: string };
// }

// export default async function ProfilePage({ params }: { params: Props["params"] }) {
//   const user = await prisma.user.findUnique({
//     where: { username: params.username },
//   });

//   if (!user) return notFound();

//   const fullUser = await prisma.user.findUnique({
//     where: { id: user.id },
//     include: { projects: true }, 
//   });

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold">{user.name}</h1>
//       <p className="text-gray-600">@{fullUser?.username}</p>
//       <p className="text-gray-600">{user.email}</p>
//       <p>
//         {fullUser?.projects.length} project{fullUser?.projects.length !== 1 ? "s" : ""}
//       </p>
//     </main>
//   );
// }


import prisma from "@/lib/db";
import { notFound } from "next/navigation";

interface Props {
  params: { username: string };
}

const deslugify = (slug: string) => slug.replace(/-/g, ' ');

export default async function ProfilePage({ params }: { params: Props["params"] }) {
  let user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  if (!user) {
    const deslugified = deslugify(params.username).toLowerCase();
    const users = await prisma.user.findMany();
    const foundUser = users.find((u) => u.name.toLowerCase() === deslugified);

    if (!foundUser) return notFound(); 

    user = foundUser; 
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { projects: true },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-600">@{fullUser?.username || fullUser?.name}</p>
      <p className="text-gray-600">{user.email}</p>
      <p>
        {fullUser?.projects.length} project{fullUser?.projects.length !== 1 ? "s" : ""}
      </p>
    </main>
  );
}
