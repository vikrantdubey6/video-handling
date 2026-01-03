"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Progress } from "@/src/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Spinner } from "@/src/components/ui/spinner"

export default function VideoUploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isFormValid = title.trim() && description.trim() && videoUrl;
   const [videoProgress, setVideoProgress] = useState(0);
  const [thumbProgress, setThumbProgress] = useState(0);
  
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setVideoUrl(null);
    setThumbnailUrl(null);
    setVideoProgress(0);
    setThumbProgress(0);

    toast("Upload cancelled", {icon: "⚠️"})
    router.replace("/videos/create")

  }

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Title, description and video are required");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/videos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl: thumbnailUrl ?? null,
        }),
      });

      if (!res.ok) {
      //  const text = await res.text(); // SAFE
        throw new Error("Failed to upload video");
      }

      toast.success("Video published successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish video");
    } finally {
      setSubmitting(false);
    }
  };

  
  return (
    <div className="space-y-6">
      {/* 🎥 VIDEO UPLOAD */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Video</CardTitle>
          <CardDescription>
            Upload the main video file (required)
          </CardDescription>
        </CardHeader>
        <Button className="bg-gray-600 text-white font-bold ">
          <FileUpload
            fileType="video"
            onProgress={(p) => setVideoProgress(p)}
            onSuccess={(res) => {
              setVideoUrl(res.url);
              setVideoProgress(100);    
            toast.success("Video uploaded")
            }}/>
          {videoProgress>0 && videoProgress<100 && (
            <Progress value={videoProgress}/>
          )}
          {videoProgress === 100 &&(
             <p className="text-sm font-medium text-green-600">
              ✅ Ready to publish
               </p>
          )}
        </Button>
      </Card>
    
      {/* 🖼️ THUMBNAIL UPLOAD */}
      <Card>
        <CardHeader>
          <CardTitle>Thumbnail (Optional)</CardTitle>
          <CardDescription>
            Upload a thumbnail image for better visibility
          </CardDescription>
        </CardHeader>
        <Button className="bg-gray-600 text-white font-bold ">
          <FileUpload
          
            fileType="image"
            onProgress={(p)=> setThumbProgress(p)}
            onSuccess={(res) => {
              setThumbnailUrl(res.url);
              setThumbProgress(100)
            }}
          />
          {thumbProgress>0 && thumbProgress<99 && (
            <Progress value={thumbProgress}/>
          )}
          {thumbProgress===100 &&(
             <p className="text-sm font-medium text-green-600">
              ✅ Ready to publish
               </p>
          )}
        </Button>
      </Card>

      {/* 📝 VIDEO DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>
            Add a title and description for your video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Video description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 🚀 PUBLISH */}
      <div className="flex gap-4">
         <Button
        onClick={handleSubmit}
        variant="outline"
        disabled={!isFormValid || submitting}
        className="flex-1"
        size="lg"
      >
        {submitting ? "Publishing..." : "Publish Video"}
         {/* <Spinner /> */}
      </Button>
       <Button
          variant="outline"
          onClick={handleCancel}
          className="flex-1"
          size="lg"
        >
          Cancel
        </Button>
      </div>
     
    </div>
  );
}