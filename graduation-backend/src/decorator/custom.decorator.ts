import { SetMetadata } from '@nestjs/common';

export const RequireLogin = () => SetMetadata('requireLogin', 'true');

export const RequirePermission = (...PermissionEntity: string[]) =>
  SetMetadata('requirePermission', PermissionEntity);
