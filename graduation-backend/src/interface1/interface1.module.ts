import { Module } from '@nestjs/common';
import { Interface1Service } from './interface1.service';
import { Interface1Controller } from './interface1.controller';

@Module({
  controllers: [Interface1Controller],
  providers: [Interface1Service],
})
export class Interface1Module {}
