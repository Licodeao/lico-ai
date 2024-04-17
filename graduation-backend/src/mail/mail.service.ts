import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createTransport, Transporter } from 'nodemailer';
import { InvitationEntity } from 'src/invitation/entities/invitation.entity';
import { TeamEntity } from 'src/team/entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  transporter: Transporter;

  @InjectRepository(TeamEntity)
  teamRepository: Repository<TeamEntity>;

  @InjectRepository(InvitationEntity)
  invitationRepository: Repository<InvitationEntity>;

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
