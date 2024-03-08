import { RoleEntity } from './src/user/entities/role.entity';

declare module 'express' {
  interface Request {
    user: {
      email: string;
      roles: RoleEntity[];
    };
  }
}
