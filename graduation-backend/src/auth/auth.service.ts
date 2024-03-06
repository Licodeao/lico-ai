import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateAuth() {
    return 'Authentication successful';
  }
}
