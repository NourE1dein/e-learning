import { Prop } from "@nestjs/mongoose";

export class MonitorScoreDto{

    @Prop({ required: true })
  score: number;


}