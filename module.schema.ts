import { Schema, Document } from 'mongoose';

export interface Module extends Document {
  courseId: string; // Reference to Course
  title: string;
  content: string;
  resources: any; 
  createdAt: Date;
}

export const ModuleSchema = new Schema<Module>({
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  resources: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

