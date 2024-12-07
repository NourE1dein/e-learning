import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Request } from 'express'; // Import the Request type

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return an access token on login', async () => {
    const result = { accessToken: 'valid-jwt-token' };

    // Mock the login method of AuthService
    jest.spyOn(authService, 'login').mockResolvedValue(result);

    // Mock the request object
    const mockRequest = {
      ip: '127.0.0.1',
    } as Request;

    // Call the controller method with both parameters (authDto and mockRequest)
    const response = await authController.login(
      {
        email: 'test@example.com',
        password: 'password123',
      },
      mockRequest, // Pass the mocked request object here
    );

    expect(response).toEqual(result);
  });
});
