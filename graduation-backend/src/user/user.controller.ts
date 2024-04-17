import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Res,
  ValidationPipe,
  Query,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

    const user = (await this.userService.login(loginUser)) as UserEntity;

    const access_token = this.jwtService.sign(
      {
        user: {
          email: user.email,
        },
      },
      {
        expiresIn: '30m',
      },
    );

    const refresh_token = this.jwtService.sign(
      {
        user: {
          email: user.email,
        },
      },
      {
        expiresIn: '7d',
      },
    );

    res.setHeader('authorization', 'bearer ' + access_token);

    return {
      code: 200,
      message: '登录成功',
      access_token,
      refresh_token,
      user,
    };
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findUserByEmailReturnEntity(
        data.email,
      );

      const access_token = this.jwtService.sign(
        {
          user: {
            email: user.email,
          },
        },
        {
          expiresIn: '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          user: {
            email: user.email,
          },
        },
        {
          expiresIn: '7d',
        },
      );

      return {
        access_token,
        refresh_token,
        user,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
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

  @Post('info')
  async updateUserInfo(@Body() body) {
    return this.userService.update(body);
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/avatar',
        filename: (_, file: any, cb) => {
          const timestamp = new Date().getTime();
          file.timestamp = timestamp;
          const fileName = `${timestamp}${extname(file.originalname)}`;
          return cb(null, fileName);
        },
      }),
    }),
  )
  async updateUserAvatar(
    @UploadedFile() file: Express.Multer.File & { timestamp: number },
    @Body('username') username: string,
    @Body('email') email: string,
  ) {
    try {
      const { originalname, timestamp } = file;
      const fileName = `${timestamp}${extname(originalname)}`;
      const avatarUrl = `http://localhost:3000/public/avatar/${fileName}`;
      await this.userService.updateAvatar(username, email, avatarUrl);

      return {
        code: 200,
        message: '头像修改成功!',
        url: avatarUrl,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
