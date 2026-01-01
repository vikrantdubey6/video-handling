import Link from "next/link";
import { IVideo } from "@/src/models/Video";
import VideoVisibilityToggle from "./VideoVisibilityToggle";
// import DashboardVideoActions from "./DashboardButton";

export default function VideoComponent({
  video,
  showActions = false,
}: {
  video: IVideo & { _id: string };
  showActions?: boolean;
}) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="block w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full bg-black"
            style={{ aspectRatio: "10/16" }}
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
         {showActions && (
          <div className="mt-3">
            <VideoVisibilityToggle
              videoId={video._id}
              initialVisibility={video.visibility}
            />
          </div>
        )}
      </div>
    </div>
  );
}
