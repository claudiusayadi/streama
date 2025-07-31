import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { AppConfig } from './env.config';

export default registerAs('jwt', () => {
  const config = {
    secret: AppConfig.JWT_SECRET,
    signOptions: {
      expiresIn: AppConfig.JWT_TTL,
    },
  } as const satisfies JwtModuleOptions;
  return config;
});
