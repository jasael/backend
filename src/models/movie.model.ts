import { Schema, model } from "mongoose";

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true, index: true, unique: true },
  },
  {
    timestamps: true,
    collection: "movies",
  }
);

export const MovieModel = model("Movie", MovieSchema);
