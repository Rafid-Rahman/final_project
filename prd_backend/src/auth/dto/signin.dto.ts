import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
   
   @IsEmail()
   @IsNotEmpty()
   @IsString()
   email: string;

   @IsNotEmpty()
   @IsString()
   password: string;

   @IsNotEmpty()
   @IsString()
   role: string;

  }