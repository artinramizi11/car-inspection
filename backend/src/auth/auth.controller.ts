import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/dto/login-user.dto";
import { LoginClientDto } from "src/dto/login-client.dto";
import { DontIncludeJwt } from "src/dont_include_jwt";
import { JwtRefreshGuard } from "src/guards/jwt-refresh.guard";

@DontIncludeJwt()
@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService){}



    @Post("users/register")
    registerAsUser(@Body() createUser: CreateUserDto){
        return this.authService.createUser(createUser)
}

    @Post("users/login")
    login(@Body() loginDto: LoginUserDto){
        return this.authService.login(loginDto)
    }

    @UseGuards(JwtRefreshGuard)
    @Post("users/refresh-token")
    refreshToken(@Req() req){
        const user = req.user 
        return this.authService.refreshToken(user.sub)

    }

    @Post("clients/login")
    clientLogin(@Body() loginDto: LoginClientDto){
        return this.authService.loginClient(loginDto)
    }



    
}