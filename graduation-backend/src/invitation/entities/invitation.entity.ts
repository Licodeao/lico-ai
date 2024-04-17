import { TeamEntity } from 'src/team/entities/team.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InvitationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '发件人ID' })
  senderId: number;

  @Column({ length: 50, comment: '被邀请人邮箱' })
  invitedUserEmail: string;

  @Column({ length: 50, comment: '所加入的团队名' })
  teamName: string;

  @Column({ comment: '邀请状态(待处理0、已注册1)', default: 0 })
  status: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => UserEntity, (user) => user.invitations)
  user: UserEntity;

  @OneToOne(() => TeamEntity)
  @JoinColumn()
  team: TeamEntity;
}
