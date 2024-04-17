import { Body, Controller, Post } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('name')
  async updateWorkspaceName(@Body() body) {
    return await this.teamService.updateName(body);
  }
}
