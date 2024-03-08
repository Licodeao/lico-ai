import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Interface2Service } from './interface2.service';
import { CreateInterface2Dto } from './dto/create-interface2.dto';
import { UpdateInterface2Dto } from './dto/update-interface2.dto';
import {
  RequireLogin,
  RequirePermission,
} from 'src/decorator/custom.decorator';

@Controller('interface2')
@RequireLogin()
export class Interface2Controller {
  constructor(private readonly interface2Service: Interface2Service) {}

  @Post()
  create(@Body() createInterface2Dto: CreateInterface2Dto) {
    return this.interface2Service.create(createInterface2Dto);
  }

  @Get()
  @RequirePermission('定制化生成视频')
  findAll() {
    return this.interface2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interface2Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterface2Dto: UpdateInterface2Dto,
  ) {
    return this.interface2Service.update(+id, updateInterface2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interface2Service.remove(+id);
  }
}
