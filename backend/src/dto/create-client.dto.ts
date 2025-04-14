import { IsString } from "class-validator";

export class CreateClientDto {
    @IsString()
    name: string 

    @IsString()
    surname: string 

    @IsString()
    phone_number: string
}