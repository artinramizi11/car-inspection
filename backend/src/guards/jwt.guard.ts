import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers?.authorization;

        const jwtNotIncluded = this.reflector.getAllAndOverride('jwt_not_included', [context.getClass(),context.getHandler()])

        if(jwtNotIncluded) return true

        if (!authorization) {
            throw new UnauthorizedException("Authorization header is missing");
        }

        const [bearer, token] = authorization.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException("The authorization credentials were valid");
        }

        try {
            const payload = this.jwtService.verify(token, {secret: this.configService.get("jwt_secret_key") as string});
            request.user = payload;
            return true;
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }
    }
}