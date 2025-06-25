import mongoose, { Schema, Document } from "mongoose";

export interface IOurService extends Document {
  title: string;
  description: string;
  image: string;
}

const bannerSchema = new Schema<IOurService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ourService = mongoose.model<IOurService>("ourService", bannerSchema);
