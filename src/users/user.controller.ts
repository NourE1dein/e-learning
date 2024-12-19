import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UserService } from "./user.service";
import { LoginUserDto } from "./dto/LoginUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import mongoose, { Query } from "mongoose";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('create')
    CreateUser(@Body() createUserDto: CreateUserDto) {
       // createUserDto.created_at = new Date(createUserDto.created_at);
        
        return this.userService.CreateUser(createUserDto);

    }

    @Post('login')
    LoginUser(@Body() loginUserDto : LoginUserDto){

        return this.userService.LoginUser(loginUserDto)
    }


    @Get(':id')
async getUsersById(@Param('id') id :string){
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new HttpException('is not valid' , 404)
    const findUser = await this.userService.getUsersById(id)
     if(!findUser){
        throw new HttpException('user not found ' , 404)
     }
     return findUser;
}

@Patch(':id')
async updateUserInfo(@Param('id') id: string,  @Body() updateUserDto: UpdateUserDto)
 {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw  new HttpException('Invalid user ID', 400);


  const currentUser = await this.userService.updateUser(id,updateUserDto);
  if (!currentUser) throw new HttpException('User not found', 400);

  if (currentUser.role !== 'admin' && currentUser.role !== 'instructor') {
    throw new HttpException(
      'Permission denied: either admin or instructor can update user information',
      HttpStatus.FORBIDDEN,
    );
  }
  
  const updatedUser = await this.userService.updateUser(id, updateUserDto);
  if (!updatedUser) {
    throw new HttpException('User update failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  return updatedUser;
}

@Delete(':id')
async DeleteUser(@Param('id') id: string){
  const isValid = mongoose.Types.ObjectId.isValid(id)   
  if(!isValid) throw new HttpException('this id is not valid',404)
  const deletedUser = await this.userService.deleteUser(id);
  console.log("Delete result:", deletedUser);
  if(!deletedUser)throw new HttpException('the user does not exist' , 404)
    
  return  ;

}




@Get(':id/monitor-score')
async MontitorScore(@Param('id') id: string){

    const user = await this.userService.getUsersById(id).populate('scores');
    if (!user) throw new HttpException('User is not found', 400);

    if (user.role !== 'student' && user.role !== 'instructor') throw new HttpException('Permission denied: either instructor or student only can view courses grades',400)
    
      return{scores:user.scores};
    }

    @Get('IsearchStudent/:id/:fullName')
    async searchStudent(
      @Param('id') id: string, 
      @Param('fullName') fullName: string,
    ) {
      return this.userService.searchStudent(id, fullName);
    };


    @Get('SsearchInstructor/:id/:fullName')
    async searchInstructor(
      @Param('id') id: string, 
      @Param('fullName') fullName: string,
    ) {
      return this.userService.searchInstructor(id, fullName);
    };




  }