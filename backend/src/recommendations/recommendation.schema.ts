import { Schema, Document } from 'mongoose';

export interface Recommendation extends Document {
  userId: string;
  recommendedItems: string[];
  generatedAt: Date;
}

export const RecommendationSchema = new Schema<Recommendation>({
  userId: { type: String, required: true, index: true }, // Added indexing
  recommendedItems: {
    type: [String],
    required: true,
    validate: {
      validator: (arr: string[]) => arr.every(item => typeof item === 'string'),
      message: 'All recommended items must be strings.',
    },
  },
  generatedAt: { type: Date, default: Date.now },
});
