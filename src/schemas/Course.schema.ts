import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt` fields
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({required: true,enum: ['Beginner', 'Intermediate', 'Advanced'],})
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';

  @Prop({ required: true })
  createdBy: string; // Instructor ID

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Module' }] })
  modules: Types.Array<Types.ObjectId>;

  @Prop({
    type: [{ filename: { type: String }, path: { type: String } }],
    default: [],
  })
  resources: { filename: string; path: string }[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
