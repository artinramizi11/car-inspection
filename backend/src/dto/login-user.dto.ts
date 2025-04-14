import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    email: string 

    @IsString({message: "password must be string"})
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string 
}