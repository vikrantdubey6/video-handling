import mongoose, { model, models, Schema } from "mongoose";

export interface IVideo {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  controls?: boolean;
  owner:mongoose.Types.ObjectId;
  visibility: "public" | "private"  //new
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;



const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: false,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  controls: {
    type: Boolean,
    required: true,
  },

  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true,
    index:true,
  },
  visibility:{
    type:String,
    enum:["public", "private"],
    default: "public",
  },
  transformation: {
    height: {
      type: Number,
      default: VIDEO_DIMENSIONS.height,
    },
    width: {
      type: Number,
      default: VIDEO_DIMENSIONS.width,
    },
    quality: {
      type: Number,
      min: 1,
      max: 100,
    },
  },
},
{
    timestamps: true
});

const Video = models?.Video || model<IVideo>("Video", videoSchema)

export default Video;