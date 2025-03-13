import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column()
  sku: number;
  
  @Column()
  descripcion?: string;

  @Column({ type: 'longtext' }) 
  imagen: string;

  @Column({ type: 'varchar', length: 255 })
  cantidad: number;

  @Column()
  precio: string;

  @Column()
  user_id: number;
  
  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' }) // Relaciona la columna user_id con la entidad User
  user: User;

  @CreateDateColumn()
  create_at: Date;
}