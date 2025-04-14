import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        const message = exception.getResponse()
        const url = request.url 
        const status = exception.getStatus()
        const timestamp = new Date().toLocaleDateString()

      response.status(status).json({
        message: message['message'],
        url,
        status,
        timestamp
      })
    }
}