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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, comment: '团队名/工作空间名' })
  name: string;

  @Column({ comment: '团队角色' })
  team_role: string;

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

  /**
   * @field {array} members 团队成员
   */
  @ManyToMany(() => UserEntity, (user) => user.team)
  members: UserEntity[];
}
