// Lead.js
import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: "Pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead; // ✅ Default export
