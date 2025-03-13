import {
  Injectable,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { RegisterProductDto } from "./dto/registerproduct.dto";
import { ViewProductDto } from "./dto/viewproduct.dto";
import { Rolusers } from "src/auth/entities/roluser.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Rolusers)
    private rolusersRepository: Repository<Rolusers>
  ) {}

  @HttpCode(HttpStatus.OK)

   
  async register(registerProductDto: RegisterProductDto) {
   
      const product = this.productRepository.create({
        nombre: registerProductDto.nombre,
        sku: registerProductDto.sku,
        cantidad: registerProductDto.cantidad,
        descripcion: registerProductDto.descripcion,
        imagen: registerProductDto.imagen, // 🔥 Guarda la imagen en Base64
        precio: registerProductDto.precio,
        user_id: registerProductDto.user_id,
      });
  
      // Guardar producto en la base de datos
      const savedProduct = await this.productRepository.save(product);
  
      return {
        status: "success",
        message: "Product registered successfully",
        product: savedProduct,
      };
    }
    
  
  async getAllProduct() {
    
      const product = await this.productRepository.find({
        select: ["id", "nombre", "sku", "descripcion", "imagen", "cantidad", "precio"],
      });

      return {
        status: "success",
        message: "todos los productos",
        product,
      };
   
  }
  async getProduct(viewProductDto: ViewProductDto) {
    
      // Buscar el rol del usuario
      const rol = await this.rolusersRepository.findOne({
        where: { user_id: viewProductDto.user_id },
        select: ["rol_id"],
      });

      let product;

      // Si el usuario tiene rol o no, siempre obtenemos los productos
      if (!rol || rol.rol_id !== 1) {
        product = await this.productRepository.find({
          where: { user_id: viewProductDto.user_id },
        });
      } else {
        product = await this.productRepository.find({
          relations: ['user'],
          select: {
            user: {
              name: true,
            },
          },
        });
        
      }
      product = product.map(p => ({
        ...p,
        user: p.user?.name || null, 
      }));

      // Si no hay productos, devolver mensaje
      const message = !product?.length
        ? rol?.rol_id === 1
          ? "No hay productos registrados en el sistema"
          : "Vendedor no tiene productos"
        : rol?.rol_id === 1
          ? "Lista de todos los productos de los vendedores"
          : "Productos del vendedor";

      return {
        status: "success",
        message,
        product,
      };
   
  }
}
