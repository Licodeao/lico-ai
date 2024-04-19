import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class CopilotService {
  @InjectRepository(UserEntity)
  userRepository: Repository<UserEntity>;

  async reduceUserExportCount(email) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['limit', 'roles'],
    });

    console.log(user);
    if (user) {
      if (user.roles[0].name === 0) {
        user.limit.standardExportLimit -= 1;
      } else {
        user.limit.plusExportLimit -= 1;
      }
    }

    await this.userRepository.save(user);
  }

  async extractFrames(path: string, outputDirectory: string) {
    return new Promise((resolve, reject) => {
      const frames: string[] = [];

      const handledPath = join(__dirname, path);

      ffmpeg(handledPath)
        .on('filenames', (filename) => {
          console.log('Frames will be saved as:', filename);
        })
        .on('end', () => {
          console.log('提取完成');
          resolve(frames);
        })
        .on('error', (err) => {
          console.log(err);
          reject(err);
        })
        .output(join(__dirname, outputDirectory) + '/frame%d.png')
        .run();

      fs.readdirSync(join(__dirname, outputDirectory)).forEach((file) => {
        if (file.startsWith('frame')) {
          frames.push(join(__dirname, outputDirectory) + '/' + file);
        }
      });
    });
  }
}
