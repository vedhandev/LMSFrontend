import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthServiceProvider } from './authentication-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import decode from 'jwt-decode';
import 'rxjs/add/operator/do';

@Injectable()

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, public spinner: NgxSpinnerService,
    private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthServiceProvider);
    if ((req.url.search('authenticate') !== -1)) {
      return next.handle(req);
    } else {
      const tokens = authService.getToken() === 'null' ? null : decode(authService.getToken());
      if ((authService.getToken() === 'null') || (tokens === null)) {

        this.router.navigateByUrl('/');
        return throwError('Error message');
      }
      const newBody = null;
      // if(!(req.url.indexOf("accident")!==-1) && !(req.url.indexOf("document")!==-1) && !(req.url.indexOf("emp")!==-1))
      // {
      //    newBody = { ...req.body, createdBy: authService.getUser(),modifiedBy:authService.getUser() };
      // }

      const tokenizedReq = req.clone({
        setHeaders: {
          // 'Content-Type': 'application/json',
          'x-access-token': authService.getToken()
        },
        body: (newBody == null) ? req.body : newBody
      })

      this.spinner.show();

       return next.handle(tokenizedReq).do(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }, (error: any) => {
        this.spinner.hide();
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigateByUrl('/');
          }
        }
      });


    }
  }
}
