import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPostById } from '~/models/post.server';
import invariant from 'tiny-invariant';
import { marked } from 'marked';

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;
  invariant(id, 'No id provided');

  const post = await getPostById(parseInt(id));
  invariant(post, `No post found with id ${id}`);

  const html = marked(post.content);

  return json({
    message: `Hello from the server! You requested post ${id}`,
    post,
    html
  });
};

export default function Post() {
  const { message, post, html } = useLoaderData();

  return (
    <main>
      <h1>Post</h1>
      <p>Single post</p>
      <p>
        {message} with content: {post.title}
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
