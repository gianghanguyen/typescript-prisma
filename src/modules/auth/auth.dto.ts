import { User } from '@prisma/client';
import { IsString, MaxLength, IsNotEmpty} from 'class-validator'

export class AuthResponseDTO {
    user: User;
    accessToken: string;
  }

export class LoginUserDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class RegisterUserDto{
    @IsString()
    username: string;

    @IsString()
    name: string;
  
    @IsString()
    password: string;
}