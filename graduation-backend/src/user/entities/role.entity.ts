import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';

@Entity()
export class RoleEntity {
  /**
   * @field {number} id 角色ID（主键）
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @field {number} name 角色名称(0代表普通用户，1代表付费用户)
   */
  @Column({ comment: '角色名称(0代表普通用户，1代表付费用户)' })
  name: number;

  /**
   * @filed {date} createTime 角色创建时间
   */
  @CreateDateColumn()
  createTime: Date;

  /**
   * @field {date} updateTime 角色更新时间
   */
  @UpdateDateColumn()
  updateTime: Date;

  /**
   * @field {array} permissions 角色所拥有的权限（多对多关系）
   */
  @ManyToMany(() => PermissionEntity)
  @JoinTable({
    name: 'role_permission',
  })
  permissions: PermissionEntity[];
}
