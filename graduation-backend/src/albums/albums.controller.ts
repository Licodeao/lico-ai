import { Controller, Post, Body, Get } from '@nestjs/common';
import { AlbumsService } from './albums.service';

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
}
