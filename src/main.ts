import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalFilters(new CustomExceptionFilter());

    app.setGlobalPrefix('api/');

    const port = process.env.SERVER_PORT || 4000;
    await app.listen(port);

    console.log(`Server is running on http://localhost:${port}/api/`);
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
    process.exit(1);
  }
}

bootstrap();
