import { Schema, Document } from 'mongoose';

export interface Recommendation extends Document {
  userId: string; // User for whom recommendations are generated
  recommendedItems: string[]; // Array of recommended course or module IDs
  generatedAt: Date;
}

export const RecommendationSchema = new Schema<Recommendation>({
  userId: { type: String, required: true },
  recommendedItems: { type: [String], required: true },
  generatedAt: { type: Date, default: Date.now },
});
