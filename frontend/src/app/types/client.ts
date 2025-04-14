import { Car } from "./car"

export type Client = {
    id: number,
    name: string,
    surname: string,
    phone_number: number,
    cars: Car[]
}

