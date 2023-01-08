import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../../modules/authentication/services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuth()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.getToken(),
        },
      });
    }

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/sign-in'], {
        queryParams: {
          sessionFailed: true,
        },
      });
    }

    return throwError(error);
  }
}
