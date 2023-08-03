import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPostById } from '~/models/post.server';
import invariant from 'tiny-invariant';

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;
  invariant(id, 'No id provided');

  const post = await getPostById(parseInt(id));
  invariant(post, `No post found with id ${id}`);

  return json({
    message: `Hello from the server! You requested post ${id}`,
    post
  });
};

export default function Post() {
  const { message, post } = useLoaderData();

  return (
    <main>
      <h1>Post</h1>
      <p>Single post</p>
      <p>
        {message} with content: {post.title}
      </p>
    </main>
  );
}
