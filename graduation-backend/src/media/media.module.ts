import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsEntity } from 'src/albums/entities/albums.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumsEntity])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
