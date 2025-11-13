import { auth } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/syncUser";
import prisma from "@/lib/db"
import HomeComponent from "./components/Home";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    await syncUser(userId);
    redirect('/dashboard');
  }

  // const currentUser = await isAuthenticated();
  // if(currentUser) redirect('/dashboard')

  // const users = await prisma.user.findMany({
  //   select: { username: true, name: true },
  // });

  return <HomeComponent />;
}

export async function isAuthenticated() {
  const user = await currentUser();
  if (!user) {
    console.log("User not authenticated");
  }
  return user;
}

