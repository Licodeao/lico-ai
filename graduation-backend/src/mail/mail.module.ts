import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from '../team/entities/team.entity';
import { InvitationEntity } from 'src/invitation/entities/invitation.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([InvitationEntity, TeamEntity, UserEntity]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
