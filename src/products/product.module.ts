import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Rolusers } from 'src/auth/entities/roluser.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product,Rolusers])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}