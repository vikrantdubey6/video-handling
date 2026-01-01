import VideoUploadForm from "@/src/components/VideoUploadForm";

export default function CreateVideoPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload a New Video</h1>
        <p className="text-muted-foreground mt-2">
          Upload your video, add details, and publish it to your dashboard.
        </p>
      </div>

      {/* Upload Form */}
      <VideoUploadForm />
    </main>
  );
}
