import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(RedisService)
  private redisService: RedisService;

  constructor(private readonly userService: UserService) {}

  @Get('init')
  async getUserInitData() {
    await this.userService.initData();
    return 'done';
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginUser: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const codeIsRedis = await this.redisService.get(
      `${loginUser.email}_email_code`,
    );

    if (!codeIsRedis) {
      return {
        code: 401,
        data: '验证码已过期，请重新获取',
      };
    }

    if (codeIsRedis !== loginUser.validateCode) {
      return {
        code: 401,
        data: '验证码错误',
      };
    }

    const user = await this.userService.login(loginUser);

    const token = this.jwtService.sign({
      user: {
        email: user.email,
        roles: user.roles,
        albums: user.albums,
      },
    });

    res.setHeader('authorization', 'bearer ' + token);

    return {
      code: 200,
      message: '登录成功',
      token,
      user,
    };
  }

  @Post('register')
  async register(
    @Body(ValidationPipe) registerUser: UserRegisterDto,
    @Res() res: Response,
  ) {
    const codeIsRedis = await this.redisService.get(
      `${registerUser.email}_email_code`,
    );

    if (!codeIsRedis) {
      return {
        code: 401,
        data: '验证码已过期，请重新获取',
      };
    }

    if (codeIsRedis !== registerUser.validateCode) {
      return {
        code: 401,
        data: '验证码错误',
      };
    }
    const newUser = (await this.userService.register(
      registerUser,
    )) as unknown as UserEntity;

    const token = this.jwtService.sign({
      user: {
        email: newUser.email,
        roles: newUser.roles,
        albums: newUser.albums,
      },
    });

    res.setHeader('authorization', 'bearer ' + token);

    return {
      code: 200,
      message: '注册成功',
      token,
      newUser,
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
