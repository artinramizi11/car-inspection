import { IsNotEmpty, IsString } from "class-validator";

export class LoginClientDto {
    @IsString()
    @IsNotEmpty()
    name: string 

    @IsString()
    @IsNotEmpty()
    surname: string
}