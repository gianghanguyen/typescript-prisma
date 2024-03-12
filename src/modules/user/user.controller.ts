import {
  Body,
  Controller,
  Get,
  Put,
  UnauthorizedException,
  UseGuards,
  Request,
  Delete,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto, ResponseUserDto } from '../auth/auth.dto';
import { AuthenticationGuard } from '../auth/auth.jwt.guard';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
@Controller('/users')
// @Controller({
//   version: '1',
// })
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [ResponseUserDto],
  })
  async getAll(): Promise<User[]> {
    return this.userService.users({});
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'update user ',
    type: ResponseUserDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  async updateUser(
    @Body() updateUser: UpdateUserDto,
    @Request() req,
  ): Promise<any> {
    const reqUser = await this.userService.user({ id: req.user.id });
    const isMatch = this.authService.comparePassword(
      updateUser.prevPass,
      reqUser.password,
    );
    let hashedPassword: string;
    if (isMatch) {
      if (updateUser.newPass !== null) {
        hashedPassword = await bcrypt.hash(updateUser.newPass, 12);
      } else {
        hashedPassword = reqUser.password;
      }
      await this.userService.updateUser({
        where: { id: reqUser.id },
        data: {
          name: updateUser.name,
          password: hashedPassword,
          username: updateUser.username,
        },
      });
    } else {
      return new UnauthorizedException();
    }
    return reqUser;
  }

  @Delete()
  @ApiResponse({
    status: 200,
    description: 'delete user',
  })
  @UseGuards(AuthenticationGuard)
  async deleteUser(@Request() req): Promise<any> {
    await this.userService.deleteUser({ id: req.user.id });
    return {
      message: 'delete successfully',
    };
  }
}
