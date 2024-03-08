import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const requireLogin = this.reflector.getAllAndOverride('requireLogin', [
      context.getClass(),
      context.getHandler(),
    ]);

    console.log(requireLogin);

    // 目标 handler 不包含 requireLogin 的元数据，就放行，否则检查 jwt
    if (!requireLogin) {
      return true;
    }

    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      request.user = data.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('token失效，请重新登录');
    }
  }
}
