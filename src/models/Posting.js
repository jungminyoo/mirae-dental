import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true },
  whichBoard: { type: String, required: true },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;