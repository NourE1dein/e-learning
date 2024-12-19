import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Performance {
  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  userId: Types.ObjectId; // Reference to the User schema

  @Prop({ type: Types.ObjectId, ref: 'course', required: true })
  courseId: Types.ObjectId; // Reference to the Course schema

  @Prop({ required: true })
  completionPercentage: number;

  @Prop({ required: true })
  averageScore: number;

  @Prop({ required: true })
  totalTimeSpent: number; // Time spent on the course in hours or minutes
}

export const PerformanceSchema = SchemaFactory.createForClass(Performance);
