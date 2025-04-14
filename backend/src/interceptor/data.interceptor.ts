import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

@Injectable()
export class DataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler){

        const loggedAt = new Date().toLocaleDateString()

      return next.handle().pipe(map(data => ({
        message: "Sucessfully",
        data,
        loggedAt,
      })))
        
    }
}