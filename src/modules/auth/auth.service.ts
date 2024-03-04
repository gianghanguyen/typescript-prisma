import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from "../user/user.service";
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponseDTO, LoginUserDto, RegisterUserDto } from './auth.dto';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        //private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async comparePassword(password: string, storedPasswordHash: string): Promise<any>{
        return await bcrypt.compare(password, storedPasswordHash);
    }

    async login(loginUserDto: LoginUserDto): Promise<AuthResponseDTO>{
        const user = await this.userService.user({username: loginUserDto.username});

        if(!user){
            throw new UnauthorizedException();
        }

        const isMatch = await this.comparePassword(loginUserDto.password, user.password);
        
        if(!isMatch){
            throw new UnauthorizedException();
        }

        const payload = {
            id: user.id,
            name: user.name,
            username: user.username,
            password: null
        }

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: 60*60,
        });

        return {
            user: payload,
            accessToken: accessToken
        }
    }

    public async register(user: RegisterUserDto): Promise<User> {
        const hashedPassword = await this.hashPassword(user.password);
        user.password = hashedPassword;
        return this.userService.createUser(user);
    }

    

}
