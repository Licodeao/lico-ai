import { PartialType } from '@nestjs/mapped-types';
import { CreateInterface1Dto } from './create-interface1.dto';

export class UpdateInterface1Dto extends PartialType(CreateInterface1Dto) {}
