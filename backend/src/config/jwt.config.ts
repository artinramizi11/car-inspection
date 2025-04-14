import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import * as dotenv from "dotenv"
dotenv.config()

export const JwtConfig = (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
        expiresIn: process.env.JWT_EXPIRED_TIME
    }
})