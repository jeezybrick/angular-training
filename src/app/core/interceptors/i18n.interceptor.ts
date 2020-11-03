import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { I18nService } from '../services/i18n.service';

@Injectable()
export class I18nInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const i18nService = this.injector.get(I18nService);

    request = request.clone({
      setHeaders: {
        'Accept-Language': i18nService.getLanguage(),
      },
    });
    return next.handle(request);
  }
}
