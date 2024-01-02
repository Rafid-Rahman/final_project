import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPackage } from './entities/sub.entities';
import { SubscriptionController } from './sub.controller';
import { SubscriptionService } from './sub.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPackage])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
