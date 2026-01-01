'use client';

import { IVideo } from "@/src/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: (IVideo & { _id: string })[];
  showActions?: boolean; // 👈 make configurable
}

export default function VideoFeed({
  videos,
  showActions = false, // 👈 default OFF
}: VideoFeedProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoComponent
          key={String(video._id)}
          video={video}
          showActions={showActions} // 👈 pass down
        />
      ))}

      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}
