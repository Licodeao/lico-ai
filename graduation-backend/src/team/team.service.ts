import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TeamEntity } from './entities/team.entity';
import { UpdateNameDto } from './dto/update-name.dto';

@Injectable()
export class TeamService {
  constructor(private readonly entitiyManager: EntityManager) {}

  async updateName(dto: UpdateNameDto) {
    const res = await this.entitiyManager.update(
      TeamEntity,
      {
        id: dto.id,
      },
      {
        name: dto.workspaceName,
      },
    );

    if (res) {
      return {
        code: 200,
        message: '工作空间名修改成功!',
      };
    }
  }
}
