import { Controller, Post, Param, Put, Get, Body, UsePipes, ValidationPipe, UseGuards, Req, Patch, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from './entities/auth.entity';
import { JwtAuthGuard } from './jwt/auth.guard';

@Controller('prd/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup') 
  @UsePipes(new ValidationPipe())
  async signUp(@Body() signupDto: SignupDto, @Req() request): Promise<{ message: string }> {
    const paymentMethod = request.query.paymentMethod; // Extract payment method from query parameter
    return this.authService.signUp(signupDto, paymentMethod);
  }

  @Post('login')
 // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signinDto: SigninDto): Promise<{message: string; token: string}> {
    return this.authService.signIn(signinDto);
  }

  @Get('profile/:userId')
 // @UseGuards(AuthGuard())
  async getUserProfile(@Param('userId') userId: string): Promise<User> {
    return this.authService.getUserProfile(+userId);
  }

  @Put('profile/:userId')
  //@UseGuards(AuthGuard())
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateData: Partial<User>,
  ): Promise<void> {
    await this.authService.updateProfile(+userId, updateData);
  }


 /* @UseGuards(JwtAuthGuard)
  @Patch('cancel-subscription')
  async cancelSubscription(@Req() req: any) {
    const user = req.user;

    if (user.role !== 'Admin') {
      throw new ForbiddenException('Only Admins can cancel subscriptions');
    }

    // Implement cancellation logic here, delete accounts associated with the subscription, etc.
    const result = await this.authService.cancelSubscription(user.id);

    return { message: 'Subscription canceled successfully' };
  }*/

 /* @Post('forget-password')
  @UsePipes(new ValidationPipe())
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }*/
}
