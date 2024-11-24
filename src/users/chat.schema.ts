/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import mongoose, { Schema, Document } from 'mongoose';


export interface Imessage extends Document{

senderId:number ;
content:string;
timestamp:Date;


}


const MessageSchema = new Schema <Imessage>(
  {
    senderId: { type: Number, required: true }, 
    content: { type: String, required: true }, 
    timestamp: { type: Date, required:true ,default: Date.now }, 
  },
);

export interface Ichat extends Document{
    participants: [
        { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Array of user references involved in the chat
      ],
    messages: Imessage[];
    createdAt: Date ;
    updatedAt: Date
}

const ChatSchema = new Schema <Ichat>(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    messages: [MessageSchema], 
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now }
  }

);

export default mongoose.model <Ichat>("chat",ChatSchema)
