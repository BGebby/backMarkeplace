import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/databaseConfig';
import { ProductModule } from './products/product.module';
import { CloudinaryModule } from './modules/cloudinary.module';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CloudinaryModule,
    TypeOrmModule.forRoot(databaseConfig()
    ),
    AuthModule,
    ProductModule
  ],
})
export class AppModule {}