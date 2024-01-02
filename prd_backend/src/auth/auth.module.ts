import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { LocalStrategy } from './local.strategy'; 
import { SubscriptionService } from 'src/subscription/sub.service';
import { SubscriptionModule } from 'src/subscription/sub.module';
import { SubscriptionPackage } from 'src/subscription/entities/sub.entities';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature([User, SubscriptionPackage]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1000h' }, 
      
    }),
    SubscriptionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SubscriptionService],
})
export class AuthModule {}
