import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PermissionEntity {
  /**
   * @field {number} id 权限ID（主键）
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @field {string} name 权限名称
   */
  @Column({ length: 50 })
  name: string;

  /**
   * @field {date} createTime 权限创建时间
   */
  @CreateDateColumn()
  createTime: Date;

  /**
   * @field {date} updateTime 权限更新时间
   */
  @UpdateDateColumn()
  updateTime: Date;
}
