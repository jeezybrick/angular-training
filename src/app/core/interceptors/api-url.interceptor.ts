import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isAbsoluteUrl } from '../../helpers/utils';

export const API_URL = new InjectionToken<string>('apiUrl');

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(API_URL) private apiUrl: string) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.prepareUrl(req.url) });
    return next.handle(req);
  }

  private prepareUrl(url: string): string {
    url = isAbsoluteUrl(url) ? url : `${this.apiUrl}/${url}`;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
