import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  Types } from 'mongoose';

export type CourseDocument = course & Document;

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt` fields
export class course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({required: true,enum: ['Beginner', 'Intermediate', 'Advanced'],})
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';

  @Prop({ required: true })
  createdBy: string


  @Prop({ type: [{ type:Types.ObjectId, ref: 'chapter' }] })
  modules: string[];

  @Prop({ type: [{ type:Types.ObjectId, ref: 'students' }] })
  enrolledStudents: string[]

  @Prop({ type: [{ type: Types.ObjectId, ref: 'performance' }], default: [] })
  performanceEntries: Types.Array<Types.ObjectId>; // Array of performance IDs

  @Prop({required:true , enum:['available' , 'unavailable'],default: 'available'})
  status:'available' | "unavailable" ; 

  @Prop({required :true })
  courseScore:string; // lesa

}

export const CourseSchema = SchemaFactory.createForClass(course);
