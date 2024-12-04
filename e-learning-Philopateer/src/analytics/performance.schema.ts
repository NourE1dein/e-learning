import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PerformanceDocument = Performance & Document;

@Schema()
export class Performance {
  @Prop({ required: true })
  progressId: string; // Unique identifier for progress tracking

  @Prop({ required: true })
  userId: string; // Associated user ID

  @Prop({ required: true })
  courseId: string; // Associated course ID

  @Prop({ required: true, min: 0, max: 100 })
  completionPercentage: number; // Percentage of course completed

  @Prop({ default: Date.now })
  lastAccessed: Date; // Last time the course was accessed
}

export const PerformanceSchema = SchemaFactory.createForClass(Performance);
