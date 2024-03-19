import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      service: 'qq',
      host: 'smtp.qq.com',
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER_EMAIL'),
        pass: this.configService.get('MAIL_PASS_CODE'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: 'Lico-AI Platform',
        address: this.configService.get('MAIL_USER_EMAIL'),
      },
      to,
      subject,
      html,
    });
  }
}
