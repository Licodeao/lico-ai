import { PartialType } from '@nestjs/mapped-types';
import { CreateInterface2Dto } from './create-interface2.dto';

export class UpdateInterface2Dto extends PartialType(CreateInterface2Dto) {}
