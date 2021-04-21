import { Document, model, Schema } from 'mongoose';

export type ReviewDocument = Document & {
  user: string;
  rating: number;
  comment: string;
};

const reviewSchema = new Schema<ReviewDocument>({
  user: String,
  rating: Number,
  comment: String,
});

export const Review = model<ReviewDocument>('Review', reviewSchema);
