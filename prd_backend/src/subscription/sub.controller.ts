import { Controller, Get, Post, Body } from '@nestjs/common';
import { SubscriptionService } from './sub.service';
import { SubscriptionPackage } from './entities/sub.entities';

@Controller('prd')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('subscription_packages')
  getSubscriptionPackages(): Promise<SubscriptionPackage[]> {
    return this.subscriptionService.getSubscriptionPackages();
  }

  @Post()
  createSubscriptionPackage(@Body() data: Partial<SubscriptionPackage>): Promise<SubscriptionPackage> {
    return this.subscriptionService.createSubscriptionPackage(data);
  }

}
