import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity()
export class UserEntity {
  /**
   * @field {number} id 用户ID（主键）
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @field {string} username 用户名
   */
  @Column({ length: 50 })
  username: string;

  /**
   * @field {string} email 用户邮箱（注册/登录）
   */
  @Column({ length: 50 })
  email: string;

  /**
   * @field {string} type 用户登录途径（第三方/本站）
   */
  @Column({ length: 50 })
  type: string;

  /**
   * @field {date} createTime 用户创建时间
   */
  @CreateDateColumn()
  createTime: Date;

  /**
   * @field {date} updateTime 用户更新时间
   */
  @UpdateDateColumn()
  updateTime: Date;

  /**
   * @field {array} roles 用户所属角色（多对多关系）
   */
  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_role',
  })
  roles: RoleEntity[];
}
