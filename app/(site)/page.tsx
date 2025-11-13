import { auth } from "@clerk/nextjs/server";
import HomeComponent from "./components/Home";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }

  return <HomeComponent />;
}
