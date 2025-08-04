import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfig } from './app.config';

export default registerAs('db', () => {
  const config = {
    type: 'postgres',
    url: AppConfig.DB_URL,
    autoLoadEntities: true,
    logging: false,
    synchronize: false,
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
