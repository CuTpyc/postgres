import { PrismaClient } from "@prisma/client";
import type { DummyUser } from "~/.server/data/dummyjson";
const prisma = new PrismaClient();

const USER_URL = "https://dummyjson.com/users/";

const fetchData = async (id?: number, path = "") => {
  const res = await fetch(USER_URL + (id || "") + path);
  const data = await res.json();
  return data;
};

type User = DummyUser & {
  address: {
    country: string;
    city: string;
    address: string;
  };
}

async function dataSeed() {
  try {
    const dummyUsers = (await fetchData()).users;

    const users = dummyUsers.map((user: User) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        age: String(user.age),
        image: user.image,
        email: user.email,
        favorite: false,
        country: user.address.country,
        city: user.address.city,
        address: user.address.address,
      };
    });

    const userDummyPosts = (
      await Promise.all(
        dummyUsers.map((user: User) => {
          return fetchData(user.id, "/posts");
        })
      )
    ).flatMap((el) => el.posts);

    const userPosts = userDummyPosts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        userId: post.userId,
        likes: post.reactions.likes,
        dislikes: post.reactions.dislikes,
      };
    });

    await prisma.user.createMany({ data: users })
    await prisma.post.createMany({ data: userPosts });

    console.log("seed complete");
  } catch (error) {
    console.log("seed failed", error);
  }
}

dataSeed();
