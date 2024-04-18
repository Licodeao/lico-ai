import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createTransport, Transporter } from 'nodemailer';
import { InvitationEntity } from 'src/invitation/entities/invitation.entity';
import { TeamEntity } from 'src/team/entities/team.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  transporter: Transporter;

  @InjectRepository(TeamEntity)
  teamRepository: Repository<TeamEntity>;

  @InjectRepository(InvitationEntity)
  invitationRepository: Repository<InvitationEntity>;

  @InjectRepository(UserEntity)
  userRepository: Repository<UserEntity>;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      service: 'qq',
      host: 'smtp.qq.com',
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER_EMAIL'),
        pass: this.configService.get('MAIL_PASS_CODE'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: 'Lico-AI Platform',
        address: this.configService.get('MAIL_USER_EMAIL'),
      },
      to,
      subject,
      html,
    });
  }

  async createInvitation(token: string, senderId: number, teamName: string) {
    const invitation = new InvitationEntity();
    invitation.invitedUserEmail = token;
    invitation.senderId = senderId;
    invitation.status = 0;
    invitation.teamName = teamName;
    await this.invitationRepository.save(invitation);
  }

  async acceptInvitation(username: string, token: string) {
    const invitation = await this.invitationRepository.findOne({
      where: { invitedUserEmail: token },
    });

    if (!invitation) {
      throw new Error('没有该邀请!');
    }

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = token;
    newUser.type = 'Invitation';
    newUser.image_url =
      'https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/avatar1.jpg';
    await this.userRepository.save(newUser);

    let team = await this.teamRepository.findOne({
      where: {
        name: invitation.teamName,
      },
    });
    if (!team) {
      team = new TeamEntity();
      team.name = invitation.teamName;
      team.members = [];
      await this.teamRepository.save(team);
    }

    if (!team.members) {
      team.members = [newUser];
    } else {
      team.members.push(newUser);
    }

    await this.teamRepository.save(team);

    await this.invitationRepository.remove(invitation);
  }

  async findTeamWithName(teamName: string) {
    return await this.teamRepository.findOne({
      where: {
        name: teamName,
      },
    });
  }

  async saveTeam(team) {
    return this.teamRepository.save(team);
  }
}
