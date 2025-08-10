import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { globalProviders } from './config/providers.config';
import throttlerConfig from './config/throttler.config';
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
    ThrottlerModule.forRootAsync(throttlerConfig.asProvider()),
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
  providers: [...globalProviders],
})
export class AppModule {}
