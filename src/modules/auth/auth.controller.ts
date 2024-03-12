import {
  Body,
  Controller,
  Post,
  Response,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthResponseDTO,
  LoginUserDto,
  RegisterUserDto,
  ResponseUserDto,
} from './auth.dto';
import { User } from '@prisma/client';
import { AuthenticationGuard } from './auth.jwt.guard';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/response';

@Controller('/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Login info ',
    type: AuthResponseDTO,
  })
  async login(
    @Body() user: LoginUserDto,
    @Response() res,
  ): Promise<AuthResponseDTO> {
    const loginData = await this.authService.login(user);
    return res.status(201).send(loginData);
  }

  @Post('register')
  //@UsePipes(new ZodValidationPipe(createCatSchema))
  @ApiResponse({
    status: 200,
    description: 'new user',
    type: ResponseUserDto,
  })
  async register(@Body() user: RegisterUserDto): Promise<User> {
    return this.authService.register(user);
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'user info',
    type: SuccessResponse,
  })
  @UseGuards(AuthenticationGuard)
  async profile(@Request() req): Promise<any> {
    const reqUser = req.user;
    const user = await this.userService.user({ id: Number(reqUser.id) });
    return {
      message: 'User profile',
      data: user,
    };
  }
}
