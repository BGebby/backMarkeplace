import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('role_user')
export class Rolusers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol_id: number;

  @Column()
  user_id: number;
  
}