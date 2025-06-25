import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  title: string;
  subtitle: string;
  image: string;
}

const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Banner = mongoose.model<IBanner>("Banner", bannerSchema);
