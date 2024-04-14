import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MediaEntity {
  /**
   * @field {number} id 媒体ID（主键）
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @field {string} name 资源名称
   */
  @Column({ length: 50, comment: '资源名称' })
  name: string;

  /**
   * @field {string} type 资源类型
   */
  @Column({ length: 50, comment: '资源类型' })
  type: string;

  /**
   * @field {number} size 资源大小
   */
  @Column({ comment: '资源大小' })
  size: number;

  /**
   * @field {string} uploader 上传者
   */
  @Column({ length: 50, comment: '上传者' })
  uploader: string;

  /**
   * @field {string} role 所属权限
   */
  @Column({ length: 50, comment: '所属权限' })
  role: string;

  /**
   * @field {string} team 所属团队
   */
  @Column({ length: 50, comment: '所属团队' })
  team: string;

  /**
   * @field {string} team_role 所属权限
   */
  @Column({ length: 50, comment: '团队角色' })
  team_role: string;
}
