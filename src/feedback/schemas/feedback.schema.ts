import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  moduleId: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: 0 })
  rating: number;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
