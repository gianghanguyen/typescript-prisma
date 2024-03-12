import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthResponseDTO {
  @ApiProperty({
    example: {
      id: 9,
      name: null,
      username: 'username',
      password: null,
    },
  })
  user: User;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6bnVsbCwidXNlcm5hbWUiOiJ1c2VybmFtZSIsInBhc3N3b3JkIjpudWxsLCJpYXQiOjE3MDk4ODU5MDksImV4cCI6MTcwOTg4OTUwOX0.pwGMQoX8mBEaVWM8d08upkTbgmtcVFrv7mBl54e_slc',
  })
  accessToken: string;
}

export class LoginUserDto {
  @ApiProperty({ default: 'username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterUserDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  prevPass: string;

  @ApiProperty({ example: 'newPassword' })
  @ApiProperty()
  @IsString()
  newPass: string;

  @ApiProperty({ example: 'name' })
  @ApiProperty()
  @IsString()
  name: string;
}

export class ResponseUserDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'username' })
  username: string;
  @ApiProperty({
    example: '$2b$12$sc3NixU/CKLC79E6DzqBMO8oh0UxRrBUGzmwrMTIHtyAVA7zToL3O',
  })
  password: string;
  @ApiProperty({ example: 'name' })
  name: string;
}
