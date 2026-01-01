import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import VideoFeed from "@/src/components/VideoFeed";
import { IVideo } from "@/src/models/Video";

interface IVideoWithOwner extends IVideo {
  owner: string;
}

async function getUserVideos(
  userId: string
): Promise<(IVideoWithOwner & { _id: string })[]> {
  try {
    const res = await fetch(
      `/api/videos/mine/`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    const videos: (IVideoWithOwner & { _id: string })[] = await res.json();

    // Filter videos owned by logged-in user
    return videos.filter(
      (video) => String(video.owner) === userId
    );
  } catch (error) {
    console.error("Error fetching user videos:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    // Middleware should already block this, but extra safety
    return null;
  }

  const videos = await getUserVideos(session.user.id);

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>

        <Link
          href="/videos/create"
          className="btn btn-primary"
        >
          Upload Video
        </Link>
      </div>

      {/* User Videos */}
      <VideoFeed videos={videos}  showActions/>
    </main>
  );
}
