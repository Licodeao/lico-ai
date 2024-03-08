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

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }
    const roles = await this.userService.findRolesById(
      request.user.roles.map((role) => role.id),
    );

    const permissions: PermissionEntity[] = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);

    console.log(permissions);

    const requirePermission = this.reflector.getAllAndOverride<string[]>(
      'requirePermission',
      [context.getClass(), context.getHandler()],
    );

    console.log(requirePermission);

    for (let i = 0; i < requirePermission.length; i++) {
      const curPermission = requirePermission[i];
      const found = permissions.find(
        (permission) => permission.name === curPermission,
      );

      if (!found) {
        throw new UnauthorizedException('您没有权限访问该接口!');
      }
    }
    return true;
  }
}
