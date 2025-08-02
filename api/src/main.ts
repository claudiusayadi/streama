import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { PackageJson } from 'src/common/interfaces/pkg.interface';
import pkg from '../package.json';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);
  const prefix = AppConfig.API_PREFIX;
  const port = AppConfig.API_PORT;
  const env = AppConfig.NODE_ENV;
  const p = pkg as PackageJson;
  const title: string = p?.name?.replace(/-/g, ' ').toUpperCase() ?? '';

  app.use(helmet());
  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix(prefix);

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(p?.description ?? '')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setVersion(p?.version ?? '1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port ?? 3000);
  logger.log(
    `📚 Swagger documentation available at http://localhost:${port}/${prefix}/docs`,
  );
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`🌍 Environment: ${env}`);
}
bootstrap();
