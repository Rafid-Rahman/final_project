import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SubscriptionPackage } from 'src/subscription/entities/sub.entities';
import { SubscriptionService } from 'src/subscription/sub.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async signUp(signupDto: SignupDto, paymentMethod: string): Promise<{ message: string }> {

    try{

      console.log('Signup DTO:', signupDto);

    const existingUser = await this.authRepository.findOne({where: { email: signupDto.email }});
    if (existingUser) {
      throw new UnauthorizedException('Email is already in use');
    }

    console.log('Original Password:', signupDto.password);

    const saltRounds = 10;
    
    const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);

    console.log('Hashed Password:', hashedPassword);
    
    const defaultSubscriptionPackage: SubscriptionPackage [] = await this.subscriptionService.getSubscriptionPackages();

    const newUser = this.authRepository.create({
      ...signupDto,
      //subscriptionPackage : defaultSubscriptionPackage,
      paymentMethod: paymentMethod,
      password_hash: hashedPassword,
    });

    await this.authRepository.save(newUser);

    return { message: 'Signup Successful' };
  }catch(error){
    console.error('Error during signup:',error);
    throw new UnauthorizedException('Error during password hashing'); 
  }
}

async signIn(signinDto: SigninDto): Promise<{ message: string; token: string; role: string }> {
  const user = await this.authRepository.findOne({ where: { email: signinDto.email } });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const isPasswordValid = await bcrypt.compare(signinDto.password, user.password_hash);

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, 'your_secret_key', {
    expiresIn: '1500h',
  });

  return { message: `Welcome to dashboard, ${user.username}`, token, role: user.role };
}

async getUserProfile(userId: number): Promise<User> {
  const user = await this.authRepository.findOne({where: {id: userId}});
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
}

async updateProfile(userId: number, updateData: Partial<User>): Promise<void> {
  await this.authRepository.update(userId, updateData);
}

/*async cancelSubscription(userId: number): Promise<void> {
  const findOptions : FindOneOptions<User>= { relations: ['subscriptionPackage'] } as FindOneOptions<User>;
  const user = await this.authRepository.findOne(userId, findOptions);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (!user.subscriptionPackage) {
    throw new BadRequestException('User does not have an active subscription');
  }

  // Implement cancellation logic here, delete accounts associated with the subscription, etc.
  await this.authRepository.delete({ subscriptionPackage: { id: user.subscriptionPackage.id } });

  // Remove the subscription package reference from the user
  user.subscriptionPackage = null;
  await this.authRepository.save(user);
}*/
}
  /*async forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<{ message: string }> {
    const user = await this.authRepository.findOne({where: { email: forgetPasswordDto.email }});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = jwt.sign({ userId: user.id, email: user.email }, 'your_reset_secret_key', {
      expiresIn: '15h', 
    });

    user.password_reset_token = resetToken;
    await this.authRepository.save(user);
    console.log("Token: ", resetToken);
    return { message: 'Reset token sent to your email successfully'};
    
  }*/

