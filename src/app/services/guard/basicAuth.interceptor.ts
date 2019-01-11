import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, public message: NzMessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: any = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          token
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            this.message.warning("当前身份已过期，请重新登录！");
            localStorage.clear();
            setTimeout(() => {
              this.router.navigate(["/index"]);
            }, 2000);
            break;
          case 404:
            this.message.error(
              "No such resource found ☹️" + err.status.toString()
            );
            break;
          case 500:
            this.message.error(
              "An unknown server error has occurred ☹️" + err.status.toString()
            );
            break;
          default:
            break;
        }
        return throwError(err);
      })
    );
  }
}
