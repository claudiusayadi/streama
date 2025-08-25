import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import httpConfig from 'src/config/http.config';
import { configProvider } from 'src/config/providers.config';
import { TraktService } from './trakt.service';

@Module({
  imports: [HttpModule.registerAsync({ useFactory: () => httpConfig })],
  providers: [TraktService, ...configProvider],
  exports: [TraktService],
})
export class TraktModule {}
