import type { Post } from '@prisma/client';
import prisma from '~/db.server';

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

export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  const newPost = await prisma.post.create({
    data: post
  });
  return newPost;
}
