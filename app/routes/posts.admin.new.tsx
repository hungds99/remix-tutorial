import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData, useNavigation } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { createPost } from '~/models/post.server';

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get('title');
  const content = formData.get('content');

  invariant(typeof title === 'string', 'title must be a string');
  invariant(typeof content === 'string', 'content must be a string');

  const errors = {
    title: title.length < 3 ? 'Title must be at least 3 characters' : null,
    content: content.length < 3 ? 'Content must be at least 3 characters' : null
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  await createPost({ title, content });

  return redirect('/posts/admin');
};

export default function NewPost() {
  const errors = useActionData<typeof action>();

  const navigation = useNavigation();
  const isCreating = Boolean(navigation.state === 'submitting');

  return (
    <div>
      <h1>New Post</h1>
      <p>Create a new post</p>
      <div>
        <form method='post'>
          <div>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' />
            {errors?.title && <div>{errors.title}</div>}
          </div>
          <div>
            <label htmlFor='content'>Content</label>
            <textarea id='content' name='content' />
            {errors?.content && <div>{errors.content}</div>}
          </div>
          <button type='submit' disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
