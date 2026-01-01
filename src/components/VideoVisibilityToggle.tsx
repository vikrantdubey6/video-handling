"use client";

import { Switch } from "@/src/components/ui/switch";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VideoVisibilityToggle({
  videoId,
  initialVisibility,
}: {
  videoId: string;
  initialVisibility: "public" | "private";
}) {
  const router = useRouter();
  const [visibility, setVisibility] = useState(initialVisibility);
  const isPublic = visibility === "public";

  const toggleVisibility = async (checked: boolean) => {
    const newVisibility = checked ? "public" : "private";

    setVisibility(newVisibility); // optimistic UI

    try {
      const res = await fetch(`/api/videos/${videoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: newVisibility }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      toast.success(
        newVisibility === "public"
          ? "Video is now public"
          : "Video is now private"
      );

      router.refresh();
    } catch (error) {
      // rollback on error
      setVisibility(initialVisibility);
      toast.error("Failed to update visibility");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch checked={isPublic} onCheckedChange={toggleVisibility} />
      <span className="text-sm text-muted-foreground">
        {isPublic ? "Public" : "Private"}
      </span>
    </div>
  );
}
