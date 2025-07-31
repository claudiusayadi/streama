import { registerAs } from '@nestjs/config';
import { seconds, ThrottlerModuleOptions } from '@nestjs/throttler';
import { AppConfig } from './env.config';

export default registerAs('throttler', () => {
  const config = [
    {
      ttl: seconds(AppConfig.THROTTLER_TTL),
      limit: AppConfig.THROTTLER_LIMIT,
    },
  ] as const satisfies ThrottlerModuleOptions;
  return config;
});
