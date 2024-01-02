import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SubscriptionService } from './subscription/sub.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const subscriptionService = app.get(SubscriptionService);
  await subscriptionService.seedDefaultPackages();

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
