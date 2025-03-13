import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ViewProductDto {

  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  @IsNumber()
  user_id: number;
}