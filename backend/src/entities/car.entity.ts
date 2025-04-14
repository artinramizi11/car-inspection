import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";
import { Damage } from "./damage.entity";
import { Status } from "src/enums/status.enum";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number 

    @ManyToOne(() => Client, client => client.cars, {onDelete: "CASCADE"})
    client: Client

    @Column()
    make: string 

    @Column()
    model: string 

    @Column()
    year: number

    @OneToMany(() => Damage, damage => damage.car, {eager: true})
    damages: Damage[]

    @Column()
    vehicle_personal_number: number

    @Column({enum: Status, default: Status.Not_Repaired})
    status: Status
}