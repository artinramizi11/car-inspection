import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CarService } from "src/car/car.service";
import { CreateDamageDto } from "src/dto/create-damage.dto";
import { Car } from "src/entities/car.entity";
import { Damage } from "src/entities/damage.entity";
import { CarSides } from "src/enums/car-sides.enum";
import { DataSource } from "typeorm";

@Injectable()
export class DamageService {

    constructor(
        private dataSource: DataSource,
        private carService: CarService
    ){}

    async getDamagesByCarId(carId: number): Promise<Damage[]>{
        const carExists = await this.dataSource.getRepository(Car).findOneBy({id: carId})
        if(!carExists) throw new BadRequestException("No car found by this ID")
        return carExists.damages

    }

    async addNewDamage(createDamage: CreateDamageDto){
     

        const carExists = await this.dataSource.getRepository(Car).findOneBy({id: createDamage.car_id})

        if(!carExists) throw new BadRequestException("You can not add damage for non existing cars")

        const coordinatesExists = await this.dataSource.getRepository(Damage).findOneBy({
            x_coordinate: createDamage.x_coordinate,
            y_coordinate: createDamage.y_coordinate,
            car_side: createDamage.car_side
        })

        if(coordinatesExists) throw new BadRequestException(`A damage with these coordinates already exists at the ${createDamage.car_side} side`)

        try {

            const addNewDamage = await this.dataSource.getRepository(Damage).create({
                car: { id: createDamage.car_id },
                x_coordinate: createDamage.x_coordinate,
                y_coordinate: createDamage.y_coordinate,
                description: createDamage.description,
                car_side: createDamage.car_side as CarSides,
                type: createDamage.type
            })
    
            return await this.dataSource.getRepository(Damage).save(addNewDamage)

        } catch(err) {
            throw new BadRequestException(err.message)

        }
        
    }

    async deleteDamage(damageId: number, carId: number){

         await this.carService.getCarById(carId)

            const damageExists = await this.dataSource.getRepository(Damage).findOneBy({
                id: damageId,
                car: {id: carId},
            })

            if(damageExists === null) throw new BadRequestException("No damage found by this id")

            try {
                return await this.dataSource.getRepository(Damage).remove(damageExists)
            } catch(err) {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
            }
 }


}