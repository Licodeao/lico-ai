import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LimitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '普通用户次数限制', default: 1 })
  standardLimit: number;
}
