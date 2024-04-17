import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { RoleEntity } from './user/entities/role.entity';
import { PermissionEntity } from './user/entities/permission.entity';
import { Interface1Module } from './interface1/interface1.module';
import { Interface2Module } from './interface2/interface2.module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './guard/login.guard';
import { PermissionGuard } from './guard/permission.guard';
import { RedisModule } from './redis/redis.module';
import { CopilotModule } from './copilot/copilot.module';
import { AlbumsEntity } from './albums/entities/albums.entity';
import { AlbumsModule } from './albums/albums.module';
import { MediaModule } from './media/media.module';
import { MediaEntity } from './media/entities/media.entity';
import { TeamModule } from './team/team.module';
import { TeamEntity } from './team/entities/team.entity';
import { LimitEntity } from './limit/entities/limit.entity';
import { LimitModule } from './limit/limit.module';
import { InvitationModule } from './invitation/invitation.module';
import { InvitationEntity } from './invitation/entities/invitation.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: 'licodeao',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT as unknown as number,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true,
      entities: [
        UserEntity,
        RoleEntity,
        PermissionEntity,
        AlbumsEntity,
        MediaEntity,
        TeamEntity,
        LimitEntity,
        InvitationEntity,
      ],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {},
    }),
    MailModule,
    AuthModule,
    UserModule,
    Interface1Module,
    Interface2Module,
    RedisModule,
    CopilotModule,
    AlbumsModule,
    MediaModule,
    TeamModule,
    LimitModule,
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
