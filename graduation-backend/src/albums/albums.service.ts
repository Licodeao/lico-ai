import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumsEntity } from './entities/albums.entity';

@Injectable()
export class AlbumsService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async create(albumName: CreateAlbumDto) {
    return this.entityManager.insert(AlbumsEntity, {
      name: albumName.name,
    });
  }

  async findAll() {
    return this.entityManager.find(AlbumsEntity);
  }
}
