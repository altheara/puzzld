import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      reviews: {
        include: {
          puzzleBox: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <main>
      <header>
        <img
          src={user.avatarUrl ?? "/avatar-placeholder.png"}
          alt={`${user.username}'s avatar`}
        />
        <h1>@{user.username}</h1>
      </header>

      <section>
        <h2>Reviews</h2>

        {user.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          user.reviews.map((review) => (
            <article key={review.id}>
              <h3>{review.puzzleBox.title}</h3>
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export async function generateMetadata({ params }) {
    const user = await prisma.user.findUnique({
      where: { username: params.username },
      select: { username: true, avatarUrl: true },
    });
  
    if (!user) return {};
  
    return {
      title: `@${user.username} • Puzzle Reviews`,
      description: `See puzzle box reviews by ${user.username}.`,
      openGraph: {
        title: `@${user.username}`,
        images: user.avatarUrl ? [user.avatarUrl] : [],
      },
    };
  }
  