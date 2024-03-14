import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
