import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

export function credentialsInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn) {

    const modifiedReq = req.clone({
        withCredentials: true
    })

    return next(modifiedReq)
}