import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MediaEntity } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(private readonly entitiyManager: EntityManager) {}

  async save(file) {
    const { fileName, mimetype, size } = file;
    return this.entitiyManager.save(MediaEntity, {
      name: fileName,
      type: mimetype,
      size,
      uploader: 'user',
      role: '付费用户',
      team: 'Licodeao',
      team_role: 'admin',
    });
  }
}
