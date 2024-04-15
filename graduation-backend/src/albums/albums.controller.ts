import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { FindMediaDto } from './dto/find-media.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsSerivce: AlbumsService) {}

  @Post('create')
  async createAlbum(@Body() body) {
    const { name } = body;
    return this.albumsSerivce.create({ name });
  }

  @Get('findAll')
  async getAllAlbums() {
    return this.albumsSerivce.findAll();
  }

  @Get('findMedia')
  async getMediaByAlbum(@Query() query: FindMediaDto) {
    const { albumName } = query;

    const res = await this.albumsSerivce.findMediaByAlbum(albumName);

    if (res.media) {
      return {
        code: 200,
        data: res.media,
      };
    }
  }
}
