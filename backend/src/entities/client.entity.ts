import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number 

    @Column({unique: true})
    name: string 

    @Column()
    surname: string 

    @Column()
    phone_number: string

    @OneToMany(() => Car, car => car.client, {cascade: true, eager: true})
    cars: Car

    @Column({nullable: true})
    role: string

}