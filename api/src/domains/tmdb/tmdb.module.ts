import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfig } from 'src/config/app.config';
import httpConfig from 'src/config/http.config';
import { TmdbService } from './tmdb.service';

@Module({
  imports: [HttpModule.registerAsync({ useFactory: () => httpConfig })],
  providers: [TmdbService, { provide: AppConfig.TOKEN, useValue: AppConfig }],
  exports: [TmdbService],
})
export class TmdbModule {}
