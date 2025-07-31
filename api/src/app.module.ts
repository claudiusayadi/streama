import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DbModule } from './db/db.module';
import { MoviesModule } from './domains/movies/movies.module';
import { TvModule } from './domains/tv/tv.module';
import { UsersModule } from './domains/users/users.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    DbModule,
    MoviesModule,
    TvModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
