import { Schema, Document } from 'mongoose';

export interface Progress extends Document {
  userId: string; // Reference to (Student)
  courseId: string; // Reference to Course
  completionPercentage: number; // Percentage of course completed
  lastAccessed: Date; // Timestamp of the last time the course was accessed
}

export const ProgressSchema = new Schema<Progress>({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  completionPercentage: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: Date.now },
});
