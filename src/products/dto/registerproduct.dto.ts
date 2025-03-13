import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class RegisterProductDto {
  
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El SKU es obligatorio' })
  @IsNumber()
  @IsPositive()
  sku: number;

  @IsOptional() // Esto hace que la imagen sea opcional
  @IsString()
  imagen?: string;

  @IsOptional() // Esto hace que la descripción sea opcional
  descripcion?: string;

  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNotEmpty({ message: 'El precio es obligatorio' })
  precio: string;

  @IsNotEmpty({ message: 'El vendedor es obligatorio' })
  @IsNumber()
  user_id: number;

}