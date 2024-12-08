import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { user, UserSchema } from '../schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
    imports:[
        MongooseModule.forFeature([
      {
        name:user.name,
        schema:UserSchema,

      },
      

]),
    ],
    providers:[UserService],
    controllers:[UserController],

})

export class UsersModule{}