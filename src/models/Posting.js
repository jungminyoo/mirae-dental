import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: Object, required: true },
  createdAt: { type: Date, required: true },
  lastEdit: { type: Date, required: true },
  whichBoard: { type: String, required: true },
  isImportant: { type: String, required: true, default: false },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Posting = mongoose.model("Posting", postingSchema);
export default Posting;
