import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { MediaEntity } from './entities/media.entity';
import { AlbumsEntity } from 'src/albums/entities/albums.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaService {
  constructor(
    private readonly entitiyManager: EntityManager,
    @InjectRepository(AlbumsEntity)
    private readonly albumRepository: Repository<AlbumsEntity>,
  ) {}

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

  async moveMediaToAlbum(albumName: string, mediaName: string) {
    const media = await this.entitiyManager.findOne(MediaEntity, {
      where: {
        name: mediaName,
      },
    });

    const album = await this.albumRepository.findOne({
      where: {
        name: albumName,
      },
    });

    if (!media || !album) {
      throw new Error('Media or Album not found');
    }

    if (!album.media) {
      album.media = [];
    }

    album.media.push(media);

    await this.albumRepository.save(album);

    return {
      code: 200,
      message: '移动成功',
    };
  }
}
