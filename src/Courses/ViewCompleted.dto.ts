import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

export class ViewCompletedDto{

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
    completedCourses: Types.Array<Types.ObjectId>; // Array of completed Course IDs
}