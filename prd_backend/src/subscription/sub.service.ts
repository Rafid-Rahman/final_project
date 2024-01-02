import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPackage } from './entities/sub.entities';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionPackage)
    private readonly subscriptionPackageRepository: Repository<SubscriptionPackage>,
  ) {}

  async seedDefaultPackages(): Promise<void> {
    const existingPackages = await this.subscriptionPackageRepository.find();

    const defaultPackages: Partial<SubscriptionPackage>[] = [
      { name: 'PRD Premium Package', features: 'Create Document, Upload Document, Download & Share', price: 19.99 },
      // Add more packages as needed
    ];

    const packagesToInsert = defaultPackages.filter(
      (packageData) => !existingPackages.some((existingPackage) => existingPackage.name === packageData.name),
    );

    for (const packageData of packagesToInsert) {
      await this.createSubscriptionPackage(packageData);
    }
  }


  async createSubscriptionPackage(data: Partial<SubscriptionPackage>): Promise<SubscriptionPackage> {
    const subscriptionPackage = this.subscriptionPackageRepository.create(data);
    return await this.subscriptionPackageRepository.save(subscriptionPackage);
  }

  async getSubscriptionPackages(): Promise<SubscriptionPackage[]> {
    return this.subscriptionPackageRepository.find();
  }
}
