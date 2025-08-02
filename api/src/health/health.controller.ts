import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('health')
export class HealthController {
  /**
   * Health check endpoint for Docker and monitoring
   * @returns {object} - Simple health status
   * @example GET /health
   */
  @Get()
  check(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'streama-api',
      version: process.env.npm_package_version || '1.0.0',
    };
  }
}
