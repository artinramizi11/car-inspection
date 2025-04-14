import { Module } from "@nestjs/common";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [],
    controllers: [CarController],
    providers: [CarService,JwtService],
    exports: [CarService]
})
export class CarModule {}