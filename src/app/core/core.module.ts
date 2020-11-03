import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { I18nInterceptor } from './interceptors/i18n.interceptor';
import { API_URL, ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { GlobalErrorHandler } from './handlers/global-error.handler';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { environment } from '@environments/environment';

// core providers vs providedIn: 'root'
// https://stackoverflow.com/questions/50860898/angular-6-services-providedin-root-vs-coremodule
@NgModule({
  providers: [
    // { provide: ErrorHandler, useClass: SentryErrorHandler },
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: I18nInterceptor,
      multi: true,
    },
    {provide: API_URL, useValue: environment.apiUrl},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
      deps: [API_URL],
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule?: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
  }
}
