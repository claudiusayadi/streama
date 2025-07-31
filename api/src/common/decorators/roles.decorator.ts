import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/common/enums/user-role.enum';
import { NonEmptyArray } from 'src/common/utils/array.util';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: NonEmptyArray<UserRole>) =>
  SetMetadata(ROLES_KEY, roles);
