import { Module } from '@nestjs/common';
import { CopilotController } from './copilot.controller';
import { CopilotService } from './copilot.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule.register({
      responseType: 'text',
    }),
    ConfigModule.forRoot(),
    CacheModule.register(),
  ],
  controllers: [CopilotController],
  providers: [CopilotService],
})
export class CopilotModule {}
