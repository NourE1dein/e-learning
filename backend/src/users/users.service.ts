import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [];

  findAll() {
    return this.users;
  }

  create(user) {
    this.users.push(user);
    return user;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
