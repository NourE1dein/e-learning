import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Performance extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ default: 0 })
  completionPercentage: number;

  @Prop({ default: 0 })
  averageScore: number;

  @Prop({ default: Date.now })
  lastAccessed: Date;

  @Prop({ default: 0 })
  modulesCompleted: number;

  @Prop({ default: 0 })
  totalTimeSpent: number;
}

export const PerformanceSchema = SchemaFactory.createForClass(Performance);
