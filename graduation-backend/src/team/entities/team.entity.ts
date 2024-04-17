import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TeamEntity {
  /**
   * @field {number} id 团队ID（主键）
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @field {string} name 团队名
   */
  @Column({ length: 50, comment: '团队名/工作空间名' })
  name: string;

  /**
   * @field {boolean} isAdmin 是否为团队管理员, 每个用户自动为自己工作空间的管理员
   */
  @Column({ comment: '团队管理员', default: true })
  isAdmin: boolean;

  /**
   * @field {date} createTime 团队创建时间
   */
  @CreateDateColumn()
  createTime: Date;

  /**
   * @field {date} updateTime 团队更新时间
   */
  @UpdateDateColumn()
  updateTime: Date;

  /**
   * @field {array} members 团队成员
   */
  @ManyToMany(() => UserEntity, (user) => user.team)
  members: UserEntity[];
}
