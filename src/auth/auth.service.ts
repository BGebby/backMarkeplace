import { EmailDto } from './dto/email.dto';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User, Rolusers } from "./entities";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(Rolusers)
    private rolusersRepository: Repository<Rolusers>
  ) {}

  @HttpCode(HttpStatus.OK) // Define el código de respuesta como 200 OK

  async checkEmail(emailDto: EmailDto): Promise<boolean> {
    const existingEmail = await this.usersRepository.findOne({
      where: { email: emailDto.email },
    });
    return !!existingEmail; 
  }
  async register(registerDto: RegisterDto) {
   
      // Check if user exists
      const existingUser = await this.usersRepository.findOne({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new ConflictException("User already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      
      // Create new user
      const user = this.usersRepository.create({
        email: registerDto.email,
        password: hashedPassword,
        name: registerDto.name,
      });

      // Save user
      const savedUser = await this.usersRepository.save(user);

      const rol = this.rolusersRepository.create({
        rol_id: registerDto.rol_id,
        user_id: savedUser.id,
      });
      // Save rol
      await this.rolusersRepository.save(rol);

      return {
        status: "success",
        message: "User registered successfully",
        user: {
          id: savedUser.id,
          email: savedUser.email,
          name: savedUser.name,
        },
      };
    
  }

  async login(loginDto: LoginDto) {
   
      // Find user
      const user = await this.usersRepository.findOne({
        where: { email: loginDto.email },
      });
      const rol = await this.rolusersRepository.findOne({
        where: { user_id: user.id },
        select: ["rol_id"],
      });

      if (!user) {
        throw new UnauthorizedException("Invalid credentials");
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      // Generate JWT
      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        status: "success",
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          rol_id: rol?.rol_id ?? null,
        },
      };
    
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
