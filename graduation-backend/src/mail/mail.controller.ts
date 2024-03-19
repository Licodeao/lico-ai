import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('code')
  async sendEmailCode(@Query('address') address) {
    await this.mailService.sendMail({
      to: address,
      subject: 'Lico-AI Platform',
      html: `<h1>您的验证码是：${Math.floor(Math.random() * 1000000)}</h1>`,
    });

    return '发送成功';
  }
}
