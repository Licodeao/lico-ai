import { Module } from '@nestjs/common';
import { Interface2Service } from './interface2.service';
import { Interface2Controller } from './interface2.controller';

@Module({
  controllers: [Interface2Controller],
  providers: [Interface2Service],
})
export class Interface2Module {}
