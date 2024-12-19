// module.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ModuleDocument = chapter & Document;

@Schema({ timestamps: true ,  collection: 'chapters' }) // Automatically adds `createdAt` and `updatedAt` fields
export class chapter {
    
 @Prop({required: true, type: [{ type:Types.ObjectId, ref: 'course' }] })
  courseId: Types.ObjectId ;
 // Reference to the course this module belongs to

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  resources: string[]; // Array of URLs to additional resources

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({required:true})
  isOutdated?: boolean;


  @Prop({required: true,enum: ['Beginner', 'Intermediate', 'Advanced'],})
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';

  @Prop({required: true, type: [{ type:Types.ObjectId, ref: 'instructor' }] })
  CreatedBy: Types.ObjectId ;


  @Prop({required: true, type: [{ type:Types.ObjectId, ref: 'instructor' }] })
  UpdatedBy: Types.ObjectId ;

  @Prop({required:false , type:[{type: Types.ObjectId, ref: 'Quiz' }]})
  quizId?: string; // Reference to the quiz for the module

  @Prop({ type: Types.ObjectId, ref: 'QuestionBank' })
  questionBankId?: string; 
  
  
}

export const ChapterSchema = SchemaFactory.createForClass(chapter);
