import { Role } from "src/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number 

    @Column({unique: true})
    email: string 

    @Column()
    password: string 

    @Column({nullable: true})
    refresh_token: string

    @Column({nullable: true, default: Role.worker})
    role: Role
    

}