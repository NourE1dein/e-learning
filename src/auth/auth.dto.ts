// Data Transfer Object for login and signup requests
export class AuthDto {
    email: string;
    password: string;
    role?: 'student' | 'instructor' | 'admin'; // Only needed for signup
  }
  