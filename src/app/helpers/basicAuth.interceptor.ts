import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private router:Router,public message:NzMessageService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available\
        console.log(request.url)
        console.log(request.url.indexOf('login'))
        let token:any = localStorage.getItem('token');
        console.log(token)
        console.log(token==true)
        console.log(request)
        if (token) {
            request = request.clone({
                setHeaders: { 
                  token
                }
            });
        }
        return next.handle(request);
        
    }
}