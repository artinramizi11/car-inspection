import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Role } from "src/enums/role.enum";

// This is just a simple authorization if the requested user have the role worker can go to next step if not then throws an error
@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const user = request.user 

        if(!user) throw new UnauthorizedException("You are not authorized")

         
        if(user.role === Role.worker) return true

        throw new UnauthorizedException("You are unauthorized to perform this action")

    }
}