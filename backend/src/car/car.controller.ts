import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UnauthorizedException, UploadedFile, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { CarService } from "./car.service";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { CreateCarDto } from "src/dto/create-car.dto";

@Controller("cars")
export class CarController {

    constructor(
        private carsService: CarService
    ){}
    

    // only workers can see all cars information
    @UseGuards(AuthorizationGuard)
    @Get()
    getAllCars(){
        return this.carsService.findCars()
    }


    // get car by id
    @Get(":id")
    getCarById(@Param("id", ParseIntPipe) id: number){
        return this.carsService.getCarById(id)

    }

    // Only clients can do this action
    @Post()
    addCar(@Body() createCar: CreateCarDto, @Req() req){
        const user = req.user 
        if(user.role === 'client') {
            const clientId = user.sub
            if(!clientId) throw new UnauthorizedException()
            return this.carsService.addNewCar(createCar,clientId)
        } 
        throw new BadRequestException("You're not a client")
        
    }

    // Workers can update the status from not repaired to repaired
    @UseGuards(AuthorizationGuard)
    @Post(":id")
    updateStatus(@Param("id", ParseIntPipe) carId: number){
        return this.carsService.updateStatus(carId)
    }

}