import { UserRole } from 'src/common/enums/user-role.enum';
import { User } from 'src/domains/users/entities/user.entity';

export interface RequestUser {
  readonly id: string;
  readonly role: UserRole;
}

export interface JwtPayload {
  readonly sub: string;
  readonly role: UserRole;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
