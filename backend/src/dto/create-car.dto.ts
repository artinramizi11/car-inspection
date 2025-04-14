import { IsInt, IsNotEmpty, IsString, min, MinLength } from "class-validator";

export class CreateCarDto {

    @IsString()
    make: string 

    @IsString()
    model: string

    @IsInt()
    year: number

    @IsInt()
    vehicle_personal_number: number
}