import mongoose, { Schema, model, models, Types } from "mongoose";
interface IImageVariant {
  type: "SQUARE" | "WIDE" | "POTRAIT";
  price: number;
  license: "personal" | "commercial";
}

interface IProduct {
  name: string;
  description: string;
  imageUrl: string;
  variants: IImageVariant[];
  createdAt?: Date;
  updatedAt?: Date;
}

const imageVariantSchema = new Schema<IImageVariant>({
  type: {
    type: String,
    required: true,
    enum: ["SQUARE", "WIDE", "POTRAIT"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  license: {
    type: String,
    required: true,
    enum: ["personal", "commercial"],
  },
});

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    variants: [imageVariantSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = models?.Product || model<IProduct>("Product", productSchema);

export default Product;
