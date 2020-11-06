import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from '../handlers/global-error.handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { I18nInterceptor } from './i18n.interceptor';
import { API_URL, ApiUrlInterceptor } from './api-url.interceptor';
import { environment } from '@environments/environment';
import { AuthInterceptor } from './auth-interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';

export const httpInterceptorProviders = [
  {provide: ErrorHandler, useClass: GlobalErrorHandler},
  {provide: API_URL, useValue: environment.apiUrl},
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiUrlInterceptor,
    multi: true,
    deps: [API_URL],
  },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: I18nInterceptor,
  //   multi: true,
  // },
  // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: HttpErrorInterceptor,
  //   multi: true,
  // },
  // { provide: ErrorHandler, useClass: SentryErrorHandler },
];
