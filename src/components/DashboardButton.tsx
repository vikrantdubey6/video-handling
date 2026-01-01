"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "./Notification";

export default function DashboardVideoActions(
{videoId,}: 
{videoId: string;}) 

{
  const router = useRouter();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const ok = confirm("Are you sure you want to delete this video?");
    if (!ok) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/videos/${videoId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      showNotification("Video deleted", "success");
      router.refresh();
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete video", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={() => router.push(`/videos/${videoId}/edit`)}
        className="btn btn-sm btn-outline text-amber-300"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="btn btn-sm btn-error"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
