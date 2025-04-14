import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { LoginUserDto } from "src/dto/login-user.dto";
import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";
import * as argon2 from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { LoginClientDto } from "src/dto/login-client.dto";
import { Client } from "src/entities/client.entity";

@Injectable()
export class AuthService {

    constructor(
        private dataSource: DataSource,
        private jwtService: JwtService
    ){}

    async createUser(createUser: CreateUserDto){
    
        const userExists = await this.dataSource.getRepository(User).findOneBy({email: createUser.email})

        if(userExists) throw new BadRequestException("A user already exists with this email, try to use a different one")

            const hashedPassword = await argon2.hash(createUser.password)

        const newUser =  await this.dataSource.getRepository(User).create({
            email: createUser.email,
            password: hashedPassword,
        })

        return await this.dataSource.getRepository(User).save(newUser)
      
    }

    async login(loginDto: LoginUserDto){
        const userExists = await this.dataSource.getRepository(User).findOneBy({email: loginDto.email})

        if(!userExists) throw new BadRequestException("Wrong Credentials")

        const hasSamePassowrd = await argon2.verify(userExists.password,loginDto.password)  

        if(hasSamePassowrd) {
            const payload = {sub: userExists.id, email: userExists.email, role: userExists.role}
            const tokens = await this.generateTokens(payload)

            const hashedRefreshToken = await argon2.hash(tokens.refreshToken)

            userExists.refresh_token = hashedRefreshToken

            await this.dataSource.getRepository(User).save(userExists)
            
            return tokens

        }

        throw new UnauthorizedException("Wrong Credentials")
        

    }

    async generateTokens(payload: any) {
        const token =  this.jwtService.sign(payload)
        const refreshToken =  this.jwtService.sign(payload, {expiresIn: '7d'})

        return {
            token,
            refreshToken
        }

    
    }

    async verifyToken(token: string){

        const payload = await this.jwtService.verify(token)

        if(!payload.sub) throw new UnauthorizedException("Token verified failed")

        return payload
    }   

    async loginClient(loginDto: LoginClientDto){

        const clientExits = await this.dataSource.getRepository(Client).findOneBy({name: loginDto.name})

        if(!clientExits) throw new BadRequestException("No client exists by this name")

        const sameSurname = clientExits.surname === loginDto.surname
        
    if(!sameSurname) throw new BadRequestException("Wrong surname")

        const payload = {sub: clientExits.id,name: clientExits.name, surname: clientExits.surname, role: clientExits.role}

         const tokens = await this.generateTokens(payload)

         return tokens
    }

    async refreshToken(userId: number){

        const user = await this.dataSource.getRepository(User).findOneBy({id: userId})

        if(!user) throw new BadRequestException("No user found by this id")

          const payload = {id: user.id, email: user.email, role: user.role}

        const tokens = await this.generateTokens(payload)  

        const hashedRefreshToken = await argon2.hash(tokens.refreshToken)

        user.refresh_token = hashedRefreshToken

        await this.dataSource.getRepository(User).save(user)
        
        return {
            tokens
        }

    }


    
}