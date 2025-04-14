import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { DamageService } from "./damage.service";
import { CreateDamageDto } from "src/dto/create-damage.dto";
import { AuthorizationGuard } from "src/guards/authorization.guard";

@Controller("damages")
export class DamageController {

    constructor(
        private damageService: DamageService
    ){}

    // get all damages by car id
    @Get("cars/:id")
    getDamagesByCarId(@Param("id", ParseIntPipe) id: number){
        return this.damageService.getDamagesByCarId(id)
    }

    // workers can add a damage coordination
    @UseGuards(AuthorizationGuard)
    @Post()
    addNewDamage(@Body() createDamage: CreateDamageDto){
        return this.damageService.addNewDamage(createDamage)
    }

    // workers can remove the damage coordinations by the damage id 
    @UseGuards(AuthorizationGuard)
    @Delete(":damageId/cars/:carId")
    deleteDamageIdByCarId(@Param() params){
        console.log(params)
        const {damageId, carId} = params;
        return this.damageService.deleteDamage(damageId,carId)

    }


}