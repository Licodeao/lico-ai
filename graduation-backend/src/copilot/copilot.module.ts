import { Module } from '@nestjs/common';
import { CopilotController } from './copilot.controller';
import { CopilotService } from './copilot.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [
    HttpModule.register({
      responseType: 'text',
    }),
    ConfigModule.forRoot(),
    CacheModule.register(),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [CopilotController],
  providers: [CopilotService],
})
export class CopilotModule {}
