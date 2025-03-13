import { IsEmail, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string; 

  @IsString()
  @MinLength(6)
  password: string;
  
  @IsNumber()
  @IsPositive()
  rol_id: number;
}