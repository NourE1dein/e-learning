import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

export class  ViewEnrolledDto{

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
    enrolledCourses: Types.Array<Types.ObjectId>; 

}


