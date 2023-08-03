import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getPosts } from '~/models/post.server';

export const loader = async () => {
  const posts = await getPosts();

  return json({
    message: 'Hello from the server!',
    posts
  });
};

export default function Posts() {
  const { message, posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Posts</h1>
      <p>{message}</p>
      <div>
        {posts?.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <Link to={`/posts/${post.id}`}>Read more</Link>
          </div>
        ))}
      </div>
      <Link to='admin'>Admin</Link>
    </div>
  );
}
