import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Interface1Service } from './interface1.service';
import { CreateInterface1Dto } from './dto/create-interface1.dto';
import { UpdateInterface1Dto } from './dto/update-interface1.dto';
import { RequireLogin } from 'src/decorator/custom.decorator';

@Controller('interface1')
@RequireLogin()
export class Interface1Controller {
  constructor(private readonly interface1Service: Interface1Service) {}

  @Post()
  create(@Body() createInterface1Dto: CreateInterface1Dto) {
    return this.interface1Service.create(createInterface1Dto);
  }

  @Get()
  findAll() {
    return this.interface1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interface1Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterface1Dto: UpdateInterface1Dto,
  ) {
    return this.interface1Service.update(+id, updateInterface1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interface1Service.remove(+id);
  }
}
