import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateCarDto } from "src/dto/create-car.dto";
import { Car } from "src/entities/car.entity";
import { Client } from "src/entities/client.entity";
import { Status } from "src/enums/status.enum";
import { DataSource } from "typeorm";

@Injectable()
export class CarService {

    constructor(
        private dataSource: DataSource
    ){}

    async findCars(): Promise<Car[]>{
        return await this.dataSource.getRepository(Car).find({relations: ['damages','client']})
    }

    async getCarById(id: number): Promise<Car>{
        const carExists = await this.dataSource.getRepository(Car).findOneBy({id})
        if(!carExists) throw new BadRequestException("No car found by this id")
         return carExists
    }

    async addNewCar(addCarDto: CreateCarDto, clientId: number): Promise<Car>{

        const clientExists = await this.dataSource.getRepository(Client).findOneBy({id: clientId})
        
        if(!clientExists) throw new BadRequestException("You can not create cars for non existing clients!")

       try {
        const newCar = this.dataSource.getRepository(Car).create({
            client: {id: clientId},
            make: addCarDto.make,
            model: addCarDto.model,
            year: addCarDto.year,
            vehicle_personal_number: addCarDto.vehicle_personal_number
            
        })

        return await this.dataSource.getRepository(Car).save(newCar)
       } catch(err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

    async updateStatus(carId: number): Promise<{message: string,id: number,status: string}>{
        
        const car = await this.dataSource.getRepository(Car).findOneBy({id: carId})

        if(!car) throw new NotFoundException("No car found by this id")

          try {
            car.status = Status.Repaired

            await this.dataSource.getRepository(Car).save(car)
   
            return {message: "Sucessfully updated the status", id: car.id, status: car.status}
          } catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)

          }
        
    }

    async getCarByClientId(clientId: number): Promise<Car[]>{
        return await this.dataSource.getRepository(Car).find({where: {client: {id:clientId}}})
    }



}