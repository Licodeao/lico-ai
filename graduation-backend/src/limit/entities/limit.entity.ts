import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LimitEntity {
  /**
   * @field {number} id 次数ID（主键）
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @field {number} standardGenerateLimit 普通用户生成次数限制, 默认只有一次
   */
  @Column({ comment: '普通用户生成次数限制', default: 1 })
  standardGenerateLimit: number;

  /**
   * @field {number} standardExportLimit 普通用户导出次数限制, 默认只有一次
   */
  @Column({ comment: '普通用户导出次数限制', default: 1 })
  standardExportLimit: number;

  /**
   * @field {number} plusGenerateLimit 付费用户生成次数限制, 默认只有五次
   */
  @Column({ comment: '付费用户生成次数限制', default: 5 })
  plusGenerateLimit: number;

  /**
   * @field {number} plusExportLimit 付费用户导出次数限制, 默认只有五次
   */
  @Column({ comment: '付费用户导出次数限制', default: 5 })
  plusExportLimit: number;
}
