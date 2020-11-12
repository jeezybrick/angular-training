import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ErrorModel } from '../models/error.model';
import { ErrorsApiAdapter } from '../http-adapters/errors-api.adapter';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService, private errorsAdapter: ErrorsApiAdapter) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((errorResponse: HttpErrorResponse) => {
        let errors: ErrorModel;

        switch (true) {
          case errorResponse.status === 401:
            errors = this.getNoAuthErrorsAndLogout(errorResponse);
            break;
          case /^[5][0-9][0-9]$/.test(errorResponse.status.toString()): // 5xx errors
            errors = this.getServerErrors();
            break;
          default:
            errors = this.errorsAdapter.adapt(errorResponse.error);
        }

        if (errors.generalMessage) {
          // this.notificationService.showError(errors.generalMessage);
        }

        return throwError(errors);
      }),
    );
  }

  private getNoAuthErrorsAndLogout(errorResponse: HttpErrorResponse): ErrorModel {
    this.authService.logout();
    this.router.navigate(['/auth']);

    return this.errorsAdapter.adapt(errorResponse.error);
  }

  private getServerErrors(): ErrorModel {
    return new ErrorModel('Something went wrong', {});
  }
}
