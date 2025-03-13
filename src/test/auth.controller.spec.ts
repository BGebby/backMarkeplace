import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { EmailDto } from 'src/auth/dto/email.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { mockAuthService } from './mocks/auth.service.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('debe estar definido', () => {
    expect(authController).toBeDefined();
  });

  describe('checkEmail', () => {
    it('debería verificar si el email existe', async () => {
      const emailDto: EmailDto = { email: 'test@example.com' };
      mockAuthService.checkEmail.mockResolvedValue(true); // Simula que el email existe

      const result = await authController.checkEmail(emailDto);

      expect(result).toEqual({ exists: true });
      expect(mockAuthService.checkEmail).toHaveBeenCalledWith(emailDto);
    });
  });

  describe('register', () => {
    it('debería registrar un usuario y devolver el usuario creado', async () => {
      const registerDto: RegisterDto = { name: 'Test User', email: 'test@example.com', password: '123456', rol_id:1 };
      const mockUser = { id: 1, ...registerDto }; // Simulación de usuario registrado

      mockAuthService.register.mockResolvedValue(mockUser);

      const result = await authController.register(registerDto);

      expect(result).toEqual(mockUser);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('debería autenticar un usuario y devolver un token', async () => {
      const loginDto: LoginDto = { email: 'test@example.com', password: '123456' };
      const mockResponse = { accessToken: 'fake-jwt-token' };

      mockAuthService.login.mockResolvedValue(mockResponse);

      const result = await authController.login(loginDto);

      expect(result).toEqual(mockResponse);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
