import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "src/config/jwt.config";

@Module({
    imports: [JwtModule.register(JwtConfig())],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}