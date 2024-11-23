import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
    jest.spyOn(authService, 'login').mockResolvedValue(result);

    expect(await authController.login({ email: 'test@example.com', password: 'password123' })).toEqual(result);
  });
});
