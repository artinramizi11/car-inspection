import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ClientService } from "./client.service";
import * as dotenv from "dotenv"
import { CreateClientDto } from "src/dto/create-client.dto";
import { AuthorizationGuard } from "src/guards/authorization.guard";
dotenv.config()

@Controller("clients")
export class ClientController {

    constructor(
        private clientService: ClientService,
    ){}

    @UseGuards(AuthorizationGuard)
    @Get()
    getClients(){
        return this.clientService.getClients()

    }

    // Get all client informations by the user object we return through jwt authentication
    @Get("/me")
    getClientById(@Req() req){
        const user = req.user
        if(!user) throw new BadRequestException("Something went wrong")
        return this.clientService.getClientById(user.sub)

    }

    // only workers can make this action
    @UseGuards(AuthorizationGuard)
    @Post()
    createClient(@Body() createClient: CreateClientDto){
        return this.clientService.createClient(createClient)
    }

    // only workers can make this action
    @UseGuards(AuthorizationGuard)
    @Delete(":id")
    removeClient(@Param("id", ParseIntPipe) id: number){
        return this.clientService.removeClientById(id)
    }
    
}