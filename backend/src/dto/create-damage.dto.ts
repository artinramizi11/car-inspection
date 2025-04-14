import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { CarSides } from "src/enums/car-sides.enum";
import { DamageType } from "src/enums/damage-type.enum";

export class CreateDamageDto {
    @IsNumber({maxDecimalPlaces: 22})
    @Min(0)
    @Max(1)
    x_coordinate: number 

    @IsNumber({maxDecimalPlaces: 22})
    @Min(0)
    @Max(1)
    y_coordinate: number 

    @IsString()
    description: string 

    @IsInt()
    car_id: number

    @IsEnum(CarSides, {message: `Car_Side must be: ${Object.values(CarSides).join(' or ')}`})
    car_side: CarSides

    @IsEnum(DamageType)
    type: DamageType
}