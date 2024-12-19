import { ConflictException, HttpException, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/CreateUser.dto"
import { user } from "src/schemas/user.schema";
import { LoginUserDto } from "./dto/LoginUser.dto";
import * as jwt from 'jsonwebtoken';
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { ViewEnrolledDto } from "src/courses/dto/ViewEnrolled.dto";
import { ViewCompletedDto } from "src/courses/dto/ViewCompleted.dto";
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
    return { message: 'Invalid credentials user not found', statusCode: 401 };
  }
 
  if (existingUser.password !== password) {
    return { message: 'Invalid credentials wrong password', statusCode: 401 };
  }

  return { message: 'Login successful' };


};

getUsersById(id : string){
  return  this.UserModel.findById(id) ;
}


updateUser(id:string , UpdateUserDto:UpdateUserDto){

  return this.UserModel.findByIdAndUpdate(id,UpdateUserDto, {new:true});

}

async deleteUser(id:string){
  return  await this.UserModel.findByIdAndDelete(id);
}





MontitorScore(monitorScoreDto:MonitorScoreDto){
  return this.UserModel.find();
}



//INSTRUCTOR SEARCH FOR A STUDENT
async searchStudent(id: string, fullName: string) {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new HttpException('Invalid user ID', 400); 
  }

  const instructor = await this.UserModel.findById(id).exec();
  if (!instructor || instructor.role !== 'instructor') {
    throw new HttpException('Only instructors can search for students', 403); 
  }
  const user = await this.UserModel.findOne({fullName}).exec();
  if (!user || user.role !== "student") {
    return { message: 'Student does not exist' }; 
  }
  return { message: 'Student exist in website' }
};


// STUDENT SEARCH FOR INSTRUCTOR

async searchInstructor(id: string, fullName: string) {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new HttpException('Invalid user ID', 400); 
  }

  const student = await this.UserModel.findById(id).exec();
  if (!student || student.role !== 'student') {
    throw new HttpException('Only students can search for instructors', 403); 
  }
  const user = await this.UserModel.findOne({fullName}).exec();
  if (!user || user.role !== "instructor") {
    return { message: 'instructor with this name does not exist' }; 
  }
  return { message: 'instructor exist in website' }
}
  

async searchForUserById(id:string){
  const user = await this.UserModel.findOne({id}).exec();

  if(!user) throw new HttpException("user does not exist",400)

    return user ;
}




}

