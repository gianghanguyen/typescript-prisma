import { Body, Controller, Get, Param, Post, UseGuards, Response } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { AuthenticationGuard } from "../auth/auth.jwt-guard";

@Controller('/users')
export class UserController{
    constructor(private userService: UserService) {}

    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.users({});
    }


    
}