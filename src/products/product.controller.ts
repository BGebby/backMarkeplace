import { Controller, Post, Body, Get, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RegisterProductDto } from './dto/registerproduct.dto';
import { ProductService } from './product.service';
import { ViewProductDto } from './dto/viewproduct.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { cloudinaryStorage } from 'src/config/cloudinary.config';


@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  
  @Get('ver')
  async getAllProduct() {
    return this.productService.getAllProduct();
  }

  // @Post('register')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('imagen', {
  //   storage: diskStorage({
  //     destination: (req, file, cb) => {
  //       const uploadDir = './uploads';

  //       // Verificar si la carpeta existe, si no, crearla
  //       if (!fs.existsSync(uploadDir)) {
  //         fs.mkdirSync(uploadDir, { recursive: true });
  //       }

  //       cb(null, uploadDir);
  //     },
  //     filename: (req, file, cb) => {
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //       const ext = extname(file.originalname);
  //       cb(null, `${uniqueSuffix}${ext}`);
  //     }
  //   })
  // }))
  // async register(
  //   @Body() body: any,
  //   @UploadedFile() file: Express.Multer.File
  // ) {
  //   const imagenPath = file ? `/uploads/${file.filename}` : '';

  //   return this.productService.register({
  //     ...body,
  //     imagen: imagenPath, // Guardamos solo la ruta en la base de datos
  //   });
  // }
  @Post('register')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('imagen', { storage: cloudinaryStorage }))
  async register(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const imageUrl = file ? file.path : ''; // Cloudinary devuelve una URL en `file.path`

    return {
      message: 'Producto registrado',
      data: {
        ...body,
        imagen: imageUrl, // Guardamos la URL de Cloudinary en la BD
      },
    };
  }
  @Post('user')
  @UseGuards(JwtAuthGuard)
  async getProduct(@Body() viewProductDto: ViewProductDto) {
    return this.productService.getProduct(viewProductDto);
  }
  
}