import Video, { IVideo } from "@/src/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/src/lib/db";


export async function GET() {
  try {
    await dbConnect();
    const videos = await Video.find({visibility: "public"}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const body: IVideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl 
      // !body.thumbnailUrl 
      // !body.visibility
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

   let thumbnailUrl = body.thumbnailUrl

    if(!thumbnailUrl){
      thumbnailUrl = `${body.videoUrl}/ik-thumbnail.jpg`
    }

    const videoData = {
      ...body,
      owner: session.user.id,
      controls: body?.controls ?? true,
      visibility: body.visibility || "public",
      thumbnailUrl,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };
    const newVideo = await Video.create(videoData);

    return NextResponse.json(newVideo);
  } catch (error) {
    console.error("VIDEO CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}