import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {
    
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
  
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsNotEmpty()
  @IsString()
  gender: string;
  
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsString()
  role: string;
   
  @IsNotEmpty()
  @IsString()
  phone: string;
  
  }
