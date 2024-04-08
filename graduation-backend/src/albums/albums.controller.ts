import { Controller, Post, Body } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsSerivce: AlbumsService) {}

  @Post('create')
  async createAlbum(@Body() body) {
    const { name } = body;
    this.albumsSerivce.create({ name });
  }
}
