import prisma from '~/db.server';

type Post = {
  id: number;
  title: string;
};

export async function getPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany();
  return posts;
}

export async function getPostById(id: number): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: {
      id
    }
  });
  return post;
}
