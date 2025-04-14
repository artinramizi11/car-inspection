import { Module } from "@nestjs/common";
import { DamageController } from "./damage.controller";
import { DamageService } from "./damage.service";
import { CarModule } from "src/car/car.module";

@Module({
    imports:[CarModule],
    controllers:[DamageController],
    providers:[DamageService]
})
export class DamageModule {}