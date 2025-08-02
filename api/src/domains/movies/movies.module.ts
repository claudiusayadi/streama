import { Module } from '@nestjs/common';
import { TmdbModule } from 'src/domains/tmdb/tmdb.module';
import { MoviesController } from './movies.controller';

@Module({
  imports: [TmdbModule],
  providers: [],
  controllers: [MoviesController],
})
export class MoviesModule {}
