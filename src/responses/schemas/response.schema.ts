import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResponseDocument = Response & Document;

@Schema({ timestamps: true })
export class Response {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  quizId: string;

  @Prop({ type: [Object], required: true })
  answers: Record<string, any>[];

  @Prop({ default: 0 })
  score: number;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
