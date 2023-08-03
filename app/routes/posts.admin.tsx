import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { getPosts } from '~/models/post.server';

export const loader = async () => {
  const posts = await getPosts();
  return json({ posts });
};

export default function PostAdmin() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Post Admin</h1>
      <div>
        <Link to='new'>Create new post</Link>
      </div>
      <p>Admin post</p>
      <div>
        {posts?.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
