import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

/**
 * @class MediaModule
 * @description 该模块用于定义媒体资源相关服务
 */
@Module({
  imports: [],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
