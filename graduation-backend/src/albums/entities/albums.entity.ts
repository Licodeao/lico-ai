import { MediaEntity } from 'src/media/entities/media.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AlbumsEntity {
  /**
   * @field {number} id 分组ID（主键）
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @field {string} name 分组名称
   */
  @Column({ length: 50, comment: '分组名称' })
  name: string;

  /**
   * @field {date} createTime 分组创建时间
   */
  @CreateDateColumn()
  createTime: Date;

  /**
   * @field {date} updateTime 分组更新时间
   */
  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => MediaEntity)
  @JoinTable({
    name: 'albums_media',
  })
  media: MediaEntity[];
}
