import {
  ClassSerializerInterceptor,
  Provider,
  ValidationPipe,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { VALIDATION_PIPE_OPTIONS } from '../common/common.constant';
import { AppConfig } from './app.config';

export const globalProviders: Provider[] = [
  // Global Guards (order matters)
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },

  // Global Pipes
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe(VALIDATION_PIPE_OPTIONS),
  },

  // Global Interceptors
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
];

export const configProvider: Provider[] = [
  { provide: AppConfig.TOKEN, useValue: AppConfig },
];
