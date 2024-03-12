import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, AuthService],
  exports: [UserService],
})
export class UserModule {}
