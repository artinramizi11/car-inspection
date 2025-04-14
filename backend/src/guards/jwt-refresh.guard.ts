import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { find, Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";
import * as argon2 from 'argon2'

@Injectable()
export class JwtRefreshGuard implements CanActivate {

    constructor(
        private dataSource: DataSource,
        private jwtService: JwtService,
        private authService: AuthService
    ){}

    async canActivate(context: ExecutionContext) {

        const req = context.switchToHttp().getRequest()
        const authorization = req.headers?.authorization 
        
        if(!authorization) throw new UnauthorizedException()

        const [Bearer,token] = authorization.split(" ")

        const payload = this.jwtService.verify(token)

        const findUser = await this.dataSource.getRepository(User).findOneBy({id: payload.sub})

        if(!findUser) throw new UnauthorizedException()
            
        const validToken = await argon2.verify(findUser.refresh_token, token)
            

        if(validToken) {
            req.user = payload
            return true 

        }
    

        throw new UnauthorizedException("Wrong refresh token")



        
    }
}