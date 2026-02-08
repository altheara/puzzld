import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Create some dummy users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        clerkUserId: faker.string.uuid(),
        username: faker.internet.username().toLowerCase(),
        avatarUrl: faker.image.avatar(),
      },
    });
    users.push(user);
  }

  // Create 15 puzzle boxes
  for (let i = 0; i < 15; i++) {
    const box = await prisma.puzzleBox.create({
      data: {
        title: faker.commerce.productName() + " Puzzle",
        description: faker.commerce.productDescription(),
        imageUrl: faker.image.urlLoremFlickr({ category: "puzzle", width: 400, height: 300 }),
      },
    });

    // Add 0–5 reviews per box
    let numReviews = Math.floor(Math.random() * 6);
    if (i < 3) numReviews = 5 + Math.floor(Math.random() * 5);
    for (let j = 0; j < numReviews; j++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await prisma.review.create({
        data: {
          comment: faker.lorem.sentence(),
          rating: Math.floor(Math.random() * 5) + 1,
          puzzleBoxId: box.id,
          userId: randomUser.id,
        },
      });
    }
  }

  console.log("✅ Seeded database with dummy puzzle boxes and reviews!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
