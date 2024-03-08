import { Injectable } from '@nestjs/common';
import { CreateInterface1Dto } from './dto/create-interface1.dto';
import { UpdateInterface1Dto } from './dto/update-interface1.dto';

@Injectable()
export class Interface1Service {
  create(createInterface1Dto: CreateInterface1Dto) {
    return 'This action adds a new interface1';
  }

  findAll() {
    return `This action returns all interface1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interface1`;
  }

  update(id: number, updateInterface1Dto: UpdateInterface1Dto) {
    return `This action updates a #${id} interface1`;
  }

  remove(id: number) {
    return `This action removes a #${id} interface1`;
  }
}
