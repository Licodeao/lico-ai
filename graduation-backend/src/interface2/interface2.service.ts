import { Injectable } from '@nestjs/common';
import { CreateInterface2Dto } from './dto/create-interface2.dto';
import { UpdateInterface2Dto } from './dto/update-interface2.dto';

@Injectable()
export class Interface2Service {
  create(createInterface2Dto: CreateInterface2Dto) {
    return 'This action adds a new interface2';
  }

  findAll() {
    return `This action returns all interface2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interface2`;
  }

  update(id: number, updateInterface2Dto: UpdateInterface2Dto) {
    return `This action updates a #${id} interface2`;
  }

  remove(id: number) {
    return `This action removes a #${id} interface2`;
  }
}
