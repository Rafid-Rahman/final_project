import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { SubscriptionPackage } from 'src/subscription/entities/sub.entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  role: string;

  @Column()
  phone: string;

  @ManyToOne(() => SubscriptionPackage, { nullable: true })
  @JoinColumn({ name: 'subscription_package_id' })
  subscriptionPackage: SubscriptionPackage;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  password_hash: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
