import { PrismaClient } from "@prisma/client";
import type { DummyUser } from "./interfaces"

const prisma = new PrismaClient();

export async function getUsers(): Promise<DummyUser[]> {
  return await prisma.user.findMany({})
}

export async function searchUsers(query: string): Promise<DummyUser[]> {
  return await prisma.user.findMany({
    where: { firstName: { startsWith: query, mode: "insensitive" } },
  });
}

export async function getUserById(id: string): Promise<DummyUser> {
  return await prisma.user.findUnique({ where: { id: Number(id) } })
}

export async function createEmptyUser(): Promise<DummyUser> {
  return await prisma.user.create({data: { }}) as DummyUser;
}

export async function updateUser( id: string, data: DummyUser): Promise<DummyUser> {
  if (!data) {
    throw new Error("data is required")
  }
 return await prisma.user.update({ where: { id: Number(id) }, data });
}

export async function deleteUser(id: string): Promise<void> {
   await prisma.user.delete({ where: { id: Number(id) } })
}
