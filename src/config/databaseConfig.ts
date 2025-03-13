import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User, Rolusers } from '../auth/entities';
import { Product } from 'src/products/entities/product.entity';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'wllasd23xQnw5siXH|dh0AkEXv',
  database: process.env.DB_NAME || 'Marketplace',
  entities: [User, Rolusers,Product],
  synchronize: false, // ⚠️ En producción, asegúrate de tenerlo en false
  charset: 'utf8mb4',
});