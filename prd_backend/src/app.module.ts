import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppService } from './app.service';
import { SubscriptionPackage } from './subscription/entities/sub.entities';
import { SubscriptionModule } from './subscription/sub.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      entities: [SubscriptionPackage, User], 
    }),
    SubscriptionModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
