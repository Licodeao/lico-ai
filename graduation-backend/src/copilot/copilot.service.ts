import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

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
}
