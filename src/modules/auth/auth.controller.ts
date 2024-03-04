import { Body, Controller, Post, Response, Request, Get, UseGuards, Param, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponseDTO, LoginUserDto, RegisterUserDto } from "./auth.dto";
import { User } from "@prisma/client";
import { AuthenticationGuard } from "./auth.jwt-guard";
import { UserService } from "../user/user.service";

@Controller('/')
export class AuthController{
    constructor(
      private readonly authService: AuthService,
      private userService: UserService
      ){}

    @Post('login')
    async login(
      @Body() user: LoginUserDto,
      @Response() res,
    ): Promise<AuthResponseDTO> {
      const loginData = await this.authService.login(user); 
      return res.status(200).send(loginData);
    }
  
    @Post('register')
    async register(@Body() user: RegisterUserDto): Promise<User> {
      return this.authService.register(user);
    }

    @Get('user/:id')
    @UseGuards(AuthenticationGuard)
    async getInfo(@Param('id') id: number,@Request() req, @Response() res): Promise<any>{
      const reqUser = req.user;
      if(+id !== reqUser.id){
        throw new UnauthorizedException();
      }
      const user = await this.userService.user({id: +id});
      res.status(200).json({ user });
    }
}