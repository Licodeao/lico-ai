import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { AlbumsEntity } from '../../albums/entities/albums.entity';
import { TeamEntity } from '../../team/entities/team.entity';
import { LimitEntity } from 'src/limit/entities/limit.entity';

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
  @Column({ length: 50, comment: '用户名' })
  username: string;

  /**
   * @field {string} email 用户邮箱（注册/登录）
   */
  @Column({ length: 50, comment: '用户邮箱' })
  email: string;

  /**
   * @field {string} image_url 用户头像
   */
  @Column({ comment: '用户头像' })
  image_url: string;

  /**
   * @field {string} type 用户登录途径（第三方/本站）
   */
  @Column({ length: 50, comment: '用户登录途径' })
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

  /**
   * @field {array} albums 用户所拥有的资源分组(多对多关系)
   */
  @ManyToMany(() => AlbumsEntity)
  @JoinTable({
    name: 'user_albums',
  })
  albums: AlbumsEntity[];

  /**
   * @field {array} team 用户所属团队/工作空间(多对多关系)
   */
  @ManyToMany(() => TeamEntity, (team) => team.members)
  @JoinTable({
    name: 'user_team',
  })
  team: TeamEntity[];

  /**
   * @field {entity} limit 用户使用次数统计(一对一关系)
   */
  @OneToOne(() => LimitEntity)
  @JoinColumn()
  limit: LimitEntity;
}
