import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  filename: string;

  @Column()
  size: number;

  @Column()
  name: string;
}
