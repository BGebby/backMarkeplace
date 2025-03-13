import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../products/product.controller';
import { ProductService } from '../products/product.service';
import { Product } from '../products/entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { mockProductService } from './mocks/product.service.mock';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
        {
          provide: getRepositoryToken(Product),
          useClass: Repository, 
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('debe definirse', () => {
    expect(productController).toBeDefined();
  });

  describe('getAllProduct', () => {
    it('debería devolver una matriz de productos', async () => {
      const result = await productController.getAllProduct();
      expect(result).toEqual(await mockProductService.getAllProduct()); // Esperamos que el resultado sea un array vacío, que es lo que hemos mockeado
    });
  });



  describe('register', () => {
    it('debe registrar un producto y devolver el producto guardado', async () => {
      const registerDto = {  nombre: 'zapatos',
        sku: 10,
        cantidad: 1,
        precio: 50000,
        vendedor_id: 4};
      const file = { filename: 'test.jpg' } as Express.Multer.File;
  
      const result = await productController.register(registerDto, file);
  
      expect(result).toEqual(await mockProductService.register(registerDto));
      expect(mockProductService.register).toHaveBeenCalledWith({
        ...registerDto,
        imagen: '/uploads/test.jpg',
      });
    });
  });

  describe('getProduct', () => {
    it('debe devolver el producto en función de la DTO (viewProductDto) proporcionada', async () => {
      const viewProductDto = { user_id: 1 };
  
      const result = await productController.getProduct(viewProductDto);
  
      expect(result).toEqual(await mockProductService.getProduct()); 
      expect(mockProductService.getProduct).toHaveBeenCalledWith(viewProductDto);
    });
  });
});
