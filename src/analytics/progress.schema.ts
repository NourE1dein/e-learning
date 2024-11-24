/* eslint-disable prettier/prettier */
import mongoose, { Schema, Document } from 'mongoose';

export interface Progress extends Document {
  userId: string; // Reference to (Student)
  courseId: string; // Reference to Course
  completionRates: number; // Percentage of course completed
  lastAccessed: Date; // Timestamp of the last time the course was accessed
  averageScores: number;
  engagementTrends: any;
}




export const ProgressSchema = new Schema<Progress>({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  completionRates: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: Date.now },
  averageScores:{type: Number},
  engagementTrends: {type:String},
});

export default mongoose.model <Progress>("progress",ProgressSchema)
