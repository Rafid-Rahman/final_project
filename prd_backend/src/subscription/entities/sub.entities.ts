import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subscription_packages')
export class SubscriptionPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  features: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
