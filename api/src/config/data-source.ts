import { DataSource } from 'typeorm';
import { AppConfig } from './app.config';

export default new DataSource({
  type: 'postgres',
  url: AppConfig.DB_URL,
  entities: [
    'dist/src/domains/**/*.entity.js',
    'dist/src/common/**/*.entity.js',
  ],
  migrations: ['dist/src/db/migrations/*.js'],
  logging: false,
  synchronize: false,
});
