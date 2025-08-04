import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DbModule } from './db/db.module';
import { AnalyticsModule } from './domains/analytics/analytics.module';
import { MoviesModule } from './domains/movies/movies.module';
import { TmdbModule } from './domains/tmdb/tmdb.module';
import { TraktModule } from './domains/trakt/trakt.module';
import { TvModule } from './domains/tv/tv.module';
import { UsersModule } from './domains/users/users.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    DbModule,
    HealthModule,
    MoviesModule,
    TmdbModule,
    TvModule,
    UsersModule,
    TraktModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
