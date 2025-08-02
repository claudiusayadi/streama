import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { configProvider } from 'src/config/providers.config';
import httpConfig from '../../config/http.config';
import { TmdbService } from './tmdb.service';

@Module({
  imports: [HttpModule.registerAsync({ useFactory: () => httpConfig })],
  providers: [TmdbService, ...configProvider],
  exports: [TmdbService],
})
export class TmdbModule {}
