export type DummyUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: string
  image: string;
  email: string;
  favorite: boolean;
  country: string;
  city: string;
  address: string;
} | null

export type DummyPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  likes: number;
  dislikes: number;
}
