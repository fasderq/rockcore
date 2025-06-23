import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Config } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootstrap = async (): Promise<void> => {
  Config.initialize();
  const isProduction = Config.isProduction();
  if (!isProduction) {
    Config.print();
  }

  const {
    http: { host, port },
    apiPrefix,
  } = Config;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.flushLogs();

  app.enableCors({ methods: ['GET', 'POST', 'PUT'] });
  app.enableShutdownHooks();
  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('ROCKCORE')
    .setDescription('Description')
    .setVersion('3.0')
    .addTag('providers')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/api/docs`, app, documentFactory, {
    jsonDocumentUrl: 'api/docs/json',
    yamlDocumentUrl: 'api/docs/yaml',
  });

  await app.listen(port, host);
  logger.log(`Server started at: ${host}:${port}`, bootstrap.name);
};

bootstrap()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
