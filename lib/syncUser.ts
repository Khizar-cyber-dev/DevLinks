import { clerkClient } from "@clerk/nextjs/server";
import prisma from './db';

export async function syncUser(clerkUserId: string) {
  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(clerkUserId);

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!existingUser) {
      const emailExists = await prisma.user.findUnique({
        where: { email: clerkUser.emailAddresses[0]?.emailAddress ?? "" },
      });

      const usernameExists = await prisma.user.findMany({
        where: { username: clerkUser.username ?? "" },  
      });

      if (emailExists || usernameExists.length > 0) {
        console.warn(`User with email ${clerkUser.emailAddresses[0]?.emailAddress} already exists.`);
        return;
      }

      const newUser = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          name: clerkUser.firstName || clerkUser.lastName
            ? `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`
            : clerkUser.username ?? "",
          username: clerkUser.username ?? "",
          email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
          avatarUrl: clerkUser.imageUrl,
          password: "clerk-managed",
        },
      });
      console.log('Created new user:', newUser);
    }
  } catch (error) {
    console.error('Error in syncUser:', error);
  }
}