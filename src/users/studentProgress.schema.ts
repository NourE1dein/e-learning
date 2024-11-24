/* eslint-disable prettier/prettier */
import mongoose, { Schema, Document } from 'mongoose';

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface IProgress extends Document {
  completionRates: number;
  averageScores: number;
  engagementTrends: any;
}




const progressSchema = new Schema <IProgress>({

    
    completionRates:{type:Number},
    averageScores:{type: Number},
    engagementTrends: {type:String},

})

export default mongoose.model <IProgress>("progress",progressSchema)
