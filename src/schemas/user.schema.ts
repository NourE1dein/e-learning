import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class user{
    
    //@Prop({required:true , unique:true})
     //id :string;

    @Prop({required:true})
    fullName:string;
    
    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true})
    password : string;

    @Prop({required:true,enum: ['student', 'instructor', 'admin']})
    role:string;



    @Prop({required:false})
    profile_picture_url?: string;


   // @Prop({required:true})
    //created_at :Date ;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'course' }], default: [] })
    enrolledCourses: Types.Array<Types.ObjectId>; // Array of Course IDs

    @Prop({ type: [{ type: Types.ObjectId, ref: 'course' }], default: [] })
    completedCourses: Types.Array<Types.ObjectId>; // Array of completed Course IDs

    @Prop({ type: [{ courseId: Types.ObjectId, score: Number }], default: [] })
    scores: { courseId: Types.ObjectId; score: number };


}

export const UserSchema = SchemaFactory.createForClass(user) 
