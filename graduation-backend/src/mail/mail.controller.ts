import { Body, Controller, Get, Inject, Query, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { RedisService } from 'src/redis/redis.service';
import { Response } from 'express';
import * as crypto from 'crypto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Inject()
  private redisService: RedisService;

  // 生成随机的 32 字节的密钥和 16 字节的 IV（Initialization Vector）
  static key = crypto.randomBytes(32);
  static iv = crypto.randomBytes(16);

  // 加密函数
  encrypt(text, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // 解密函数
  decrypt(encryptedText, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  @Get('code')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`${address}_email_code`, code, 60 * 5);

    await this.mailService.sendMail({
      to: address,
      subject: 'Lico-AI Platform',
      html: `<h1>您的验证码是：${code}</h1>`,
    });

    return {
      code: 200,
      data: '发送成功',
    };
  }

  @Get('resend')
  async delEmailCode(@Query('address') address) {
    await this.redisService.del(`${address}_email_code`);

    await this.sendEmailCode(address);

    return {
      code: 200,
      data: '发送成功',
    };
  }

  @Get('send')
  async sendInviteMail(@Query('mail') mail: string) {
    const encryptedToken = this.encrypt(
      mail,
      MailController.key,
      MailController.iv,
    );

    await this.mailService.sendMail({
      to: mail,
      subject: `Lico-AI Platform`,
      html: `<h3>您的邀请链接是：</h3>http://localhost:3000/mail/invite?token=${encryptedToken}<h3>，点击此链接🔗或复制到地址栏，即可加入团队!</h3>`,
    });

    return {
      code: 200,
      message: '邀请链接发送成功!',
    };
  }

  @Get('invite')
  async invitePersonIntoTeam(
    @Res() res: Response,
    @Query('token') token,
    @Body() body,
  ) {
    const { admin, teamName } = body;
    const decryptedToken = this.decrypt(
      token,
      MailController.key,
      MailController.iv,
    );
    console.log(decryptedToken);

    const team = await this.mailService.findTeamWithName(teamName);

    await this.mailService.saveTeam(team);
  }

  // const team = await this.teamRepository.;

  // user[0].team[0].members.push({
  //   username: decryptedToken,
  //   email: decryptedToken,
  //   type: 'invite',
  // });

  // res.redirect('http://localhost:5173/');
}
