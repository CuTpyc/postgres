import { PrismaClient } from "@prisma/client";
import { DummyPost } from "./interfaces"
const prisma = new PrismaClient();

export async function getUserPosts(id: string): Promise<DummyPost[]> {
  const posts = await prisma.post.findMany({where: {userId: Number(id)}})
  return posts
}
