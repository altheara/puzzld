import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const allPuzzleBoxes = await prisma.puzzleBox.findMany({
    orderBy: {
      reviews: { _count: "desc" },
    },
    include: { reviews: true },
  });

  const featuredBoxes = allPuzzleBoxes.slice(0, 3);
  const gridBoxes = allPuzzleBoxes.slice(3, 23);

  return (
    <main className="container mx-auto py-10 space-y-10">
      {/* Featured Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Puzzle Boxes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredBoxes.map((box) => (
            <Card key={box.id} className="shadow-md hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{box.title}</CardTitle>
                <CardDescription>
                  {box.description ?? "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {box.imageUrl && (
                  <img
                    src={box.imageUrl}
                    alt={box.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                )}
                <p className="text-sm text-muted-foreground">
                  {box.reviews.length} review{box.reviews.length !== 1 && "s"}
                </p>
                <Link href={`/puzzle-boxes/${box.id}`}>
                  <Button className="mt-2 w-full">View Puzzle Box</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Grid Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Discover More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridBoxes.map((box) => (
            <Card key={box.id} className="shadow-md hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{box.title}</CardTitle>
                <CardDescription>
                  {box.description ?? "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {box.imageUrl && (
                  <img
                    src={box.imageUrl}
                    alt={box.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                )}
                <p className="text-sm text-muted-foreground">
                  {box.reviews.length} review{box.reviews.length !== 1 && "s"}
                </p>
                <Link href={`/puzzle-boxes/${box.id}`}>
                  <Button className="mt-2 w-full">View Puzzle Box</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {allPuzzleBoxes.length > 23 && (
          <div className="mt-6 text-center">
            <Link href="/puzzle-boxes">
              <Button>Discover More</Button>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
