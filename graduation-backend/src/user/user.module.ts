import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LimitEntity } from 'src/limit/entities/limit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LimitEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
