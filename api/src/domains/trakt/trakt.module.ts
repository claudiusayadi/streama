import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfig } from '../../config/app.config';
import { TraktService } from './trakt.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: AppConfig.HTTP_TIMEOUT,
      maxRedirects: AppConfig.HTTP_MAX_REDIRECTS,
    }),
  ],
  providers: [TraktService],
  exports: [TraktService],
})
export class TraktModule {}
