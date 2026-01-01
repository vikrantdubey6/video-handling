import VideoFeed from "@/src/components/VideoFeed";
import { IVideo } from "@/src/models/Video";
import { Hero } from "@/src/components/Hero";

async function getPublicVideos(): Promise<(IVideo & { _id: string })[]> {
  try {
    const res = await fetch(
      `/api/videos`,
      {
        cache: "no-store", // always fresh videos
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export default async function HomePage() {
  const videos = await getPublicVideos();

  return (
    <main >
      <Hero/>
      <div> <h1 className="text-2xl font-bold mb-6 text-center pt-4">
        Latest Videos
      </h1>
      <div className="container mx-auto px-4 py-6">
      <VideoFeed  videos={videos} />
      </div>
      </div>
    </main>
  );
}
