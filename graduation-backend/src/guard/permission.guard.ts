import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { PermissionEntity } from '../user/entities/permission.entity';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }

    const roles = await this.redisService.getList(
      `user_${request.user.email}_permission`,
    );

    const requirePermission = this.reflector.getAllAndOverride<string[]>(
      'requirePermission',
      [context.getClass(), context.getHandler()],
    );

    console.log(requirePermission);

    if (roles.length === 0 || !roles) {
      const foundRoles = await this.userService.findRolesById(
        request.user.roles.map((role) => role.id),
      );

      const permissions: PermissionEntity[] = foundRoles.reduce(
        (total, current) => {
          total.push(...current.permissions);
          return total;
        },
        [],
      );

      this.redisService.setList(
        `user_${request.user.email}_permission`,
        permissions.map((permission) => permission.name),
      );
      console.log(permissions);

      for (let i = 0; i < requirePermission.length; i++) {
        const curPermission = requirePermission[i];
        const found = permissions.find(
          (permission) => permission.name === curPermission,
        );

        if (!found) {
          throw new UnauthorizedException('您没有权限访问该接口!');
        }
      }
    }

    return true;
  }
}
