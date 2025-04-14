import { Client } from "./client"
import { Damage } from "./damage"

export type Car = {
    id: number,
    make: string,
    model: string,
    year: number,
    client: Client,
    vehicle_personal_number: number,
    damages: Damage[],
    status: string
}
