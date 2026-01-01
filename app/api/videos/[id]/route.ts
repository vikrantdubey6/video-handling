import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/db";
import Video from "@/src/models/Video";
import mongoose from "mongoose";
import ImageKit from "imagekit";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";


const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});
export default imagekit;

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // 1️⃣ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid video id" },
        { status: 400 }
      );
    }

   

    // 2️⃣ Connect DB
    await dbConnect();

    // 3️⃣ Fetch video
    const video = await Video.findById(id).lean();
    const session = await getServerSession(authOptions)
     if(video.visibility === "private" && 
        video.owner.toString() !== session?.user?.id
      ){
        return NextResponse.json(
          {error: "this video is private"},
          {status: 403}
        )

      }

    if (!video) {
      return NextResponse.json(
        { error: "Video not found" },
        { status: 404 }
      );
    }

    // 4️⃣ Return video
    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.error("GET /api/videos/[id] ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}

// Toggle code
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid video id" }, { status: 400 });
    }

    const body = await req.json();
    const { title, description, visibility } = body;

    await dbConnect();

    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // 🔐 Ownership check
    if (video.owner.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✏️ Update fields only if provided
    if (title !== undefined) video.title = title;
    if (description !== undefined) video.description = description;
    if (visibility !== undefined) video.visibility = visibility;

    await video.save();

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.error(" VIDEO ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}


// DELETE CODE not working

export async function DELETE(
  _req: Request,
  {params} : {params: {id: string}}
)
{
  try {
    
    const session = await getServerSession(authOptions)
    if(!session?.user?.id){
      return NextResponse.json(
      {error: "Unauthorized user"},
      {status: 401})
    }

    const {id} = await params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return NextResponse.json(
        {erro: "Invalid Video id"},
        {status: 400}
      )
    }
    await dbConnect();

    const video = await Video.findById(id);
    
    if(!video){
      return NextResponse.json(
        {error: "Video not found"},
        {status: 404}
      )
    }

    if(video.owner.toString() !== session.user.id ){
      return NextResponse.json(
        {error: "Forbidden"},
        {status: 403}
      )
    }
    console.log(Video)

    await imagekit.deleteFile(video.video.id);
    await imagekit.deleteFile(video.thumbnail.id)

    await video.deleteOne();

    return NextResponse.json(
      {message: "Video deleted successfully"},
      {status: 200}
    )

  } catch (error) {
    console.error("DELETE /api/videos/[id] ERROR:", error);
    return NextResponse.json(
      {error: "Failed to delete video"},
      {status: 500}
    )
  }
}













// METADATA UPDATE  Not working

export async function PAT(
  _req: Request,
  {params}: {params:{id:string}}
){
  try {
        const session = await getServerSession(authOptions)

        if(!session?.user?.id){
          return NextResponse.json(
            {error: "Unautorized user"},
            {status:401}
          )
        }

        const {id} = await params
        if(!mongoose.Types.ObjectId.isValid(id)){
          return NextResponse.json(
            {error:"Invalid video id"},
            {status: 400}
          )
        }
        
        const body = await  _req.json();
        const {title, description} = body;

        if(!title || !description){
          return NextResponse.json(
            {error: "Title and description are required"},
            {status: 400}
          )
        }

        await dbConnect();
const video = await Video.findById(id);

    if (!video) {
      return NextResponse.json(
        { error: "Video not found" },
        { status: 404 }
      );
    }

    // 🔐 Ownership check
    if (video.owner.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ✏️ Update metadata
    video.title = title;
    video.description = description;

    await video.save();

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.error(" /api/videos/[id] ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}