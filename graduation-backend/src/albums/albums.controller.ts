import { Controller, Post } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsSerivce: AlbumsService) {}

  @Post('create')
  async createAlbum(album: CreateAlbumDto) {
    this.albumsSerivce.create(album.name);
  }
}
