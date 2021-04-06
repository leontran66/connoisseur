import { Document, model, Schema } from 'mongoose';

export type ReviewDocument = Document & {
  rating: number;
  comment: string;
};

const reviewSchema = new Schema<ReviewDocument>({
  rating: Number,
  comment: String,
});

export const Review = model<ReviewDocument>('Review', reviewSchema);
