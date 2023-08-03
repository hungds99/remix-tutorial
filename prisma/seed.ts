import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl</p>`
    },
    {
      id: 2,
      title: 'Post 2',
      content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl</p>`
    },
    {
      id: 3,
      title: 'Post 3',
      content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl</p>`
    }
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: post,
      create: post
    });
  }
}

main()
  .then(() => {
    console.log('Data seeded.');
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
