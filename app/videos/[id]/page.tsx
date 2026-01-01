import { notFound } from "next/navigation";
import { Video } from "@imagekit/next";
import { IVideo } from "@/src/models/Video";
;


interface VideoPageProps {
  params: {
    id: string,
  };
}

async function getVideoById(
  id: string
): Promise<(IVideo & { _id: string }) | null> {
  try {
    const res = await fetch(
      `${protocol}://${host}/api/videos/${id}/`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } =  await params;
  const video = await getVideoById(id);

  if (!video) {
    notFound();
  }

  // console.log("ERRORRRRRR",video.videoUrl)
  return (
    <main className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Video Player */}
      <div className="w-full rounded-xl overflow-hidden bg-black mb-6">
        <video
           src={video.videoUrl}
            controls
            playsInline
            preload="metadata"
            className="w-full h-auto"
>
  Your browser does not support the video tag.
</video>
      </div>

      {/* Video Info */}
      <h1 className="text-2xl font-bold mb-2">
        {video.title}
      </h1>

      <p className="text-base-content/70 mb-6">
        {video.description}
      </p>
    </main>
  );
}
