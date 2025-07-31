import { DataSource } from 'typeorm';
import { AppConfig } from './env.config';

export default new DataSource({
  type: 'postgres',
  url: AppConfig.DB_URL,
  entities: ['dist/src/modules/**/*.entity.js'],
  migrations: ['dist/src/db/migrations/*.js'],
});
