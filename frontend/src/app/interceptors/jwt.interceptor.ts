import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const token = localStorage.getItem("token")

    let modifiedReq = req;

    if(token){
        modifiedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    return next(modifiedReq)

}