import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AlbumsService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async create(albumName: string) {
    this.entityManager.create(albumName);
  }
}
