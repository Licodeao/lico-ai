import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendMail() {
    return 'Mail sent successfully';
  }
}
