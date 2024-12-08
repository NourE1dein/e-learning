import { ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/CreateUser.dto"
import { user } from "src/schemas/user.schema";
import { LoginUserDto } from "./dto/LoginUser.dto";
import * as jwt from 'jsonwebtoken';
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { ViewEnrolledDto } from "src/Courses/ViewEnrolled.dto";
import { ViewCompletedDto } from "src/Courses/ViewCompleted.dto";
import { MonitorScoreDto } from "./dto/MonitorScore.dto";




export class UserService {
 
  
  constructor(
    @InjectModel(user.name) private UserModel: Model<user> ,
  ) {}

  async CreateUser(createUserDto: CreateUserDto) {

    const existingUser = await this.UserModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

   const newUser = new this.UserModel(createUserDto);
   return newUser.save();
  };



  async LoginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

  const existingUser = await this.UserModel.findOne({ email });

  if (!existingUser) {
    // If no user is found with the given email
    return { message: 'Invalid credentials', statusCode: 401 };
  }

  if (existingUser.password !== password) {
    return { message: 'Invalid credentials', statusCode: 401 };
  }

  return { message: 'Login successful' };


};

getUsersById(id : string){
  return  this.UserModel.findById(id) ;
}


updateUser(id:string , UpdateUserDto:UpdateUserDto){

  return this.UserModel.findByIdAndUpdate(id,UpdateUserDto, {new:true});

}


 viewEnrolledCourses(viewEnrolledDto : ViewEnrolledDto){

  return this.UserModel.find();

}

 viewCompletedCourses(viewCompletedCourses:ViewCompletedDto){
  return this.UserModel.find();
}


MontitorScore(monitorScoreDto:MonitorScoreDto){
  return this.UserModel.find();
}


}

