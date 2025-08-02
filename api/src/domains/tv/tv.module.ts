import { Module } from '@nestjs/common';
import { TmdbModule } from 'src/domains/tmdb/tmdb.module';
import { TvController } from './tv.controller';
import { TvService } from './tv.service';

@Module({
  imports: [TmdbModule],
  providers: [TvService],
  controllers: [TvController],
})
export class TvModule {}
