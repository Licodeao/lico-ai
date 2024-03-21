import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Inject()
  private redisService: RedisService;

  @Get('code')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`${address}_email_code`, code, 60 * 5);

    await this.mailService.sendMail({
      to: address,
      subject: 'Lico-AI Platform',
      html: `<h1>您的验证码是：${code}</h1>`,
    });

    return '发送成功';
  }
}
