import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "src/dto/create-client.dto";
import { Client } from "src/entities/client.entity";
import { DataSource } from "typeorm";

@Injectable()
export class ClientService {
    constructor(private dataSource: DataSource){}

    async getClients(){
        return await this.dataSource.getRepository(Client).find()
    }

    

    async createClient(createClient: CreateClientDto){
        const clientExists = await this.dataSource.getRepository(Client).findOneBy({name: createClient.name})
        if(clientExists) throw new BadRequestException("A client with this name already exists")
       try {
        const newClient = this.dataSource.getRepository(Client).create({
            name: createClient.name,
            surname: createClient.surname,
            phone_number: createClient.phone_number
                })

        return await this.dataSource.getRepository(Client).save(newClient)
    } catch(err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    }

    async getClientById(id: number){
        const clientExists = await this.dataSource.getRepository(Client).findOneBy({id})
        if(!clientExists) throw new NotFoundException("No client found by this id")
        return clientExists
    }

    async removeClientById(id: number){
        const clientExists = await this.dataSource.getRepository(Client).findOneBy({id})
        if(!clientExists) throw new NotFoundException("No client found by this ID")
    
            return await this.dataSource.getRepository(Client).remove(clientExists)
   
    }
}