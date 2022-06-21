import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

function generateUID(): string {
  let seed = Date.now();
  if (window.performance && typeof window.performance.now === 'function') {
    seed += performance.now();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /* tslint:disable:no-bitwise */
    const r = (seed + Math.random() * 16) % 16 | 0;
    seed = Math.floor(seed / 16);
    return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
    /* tslint:enable:no-bitwise */
  });
}

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  currentLang = 'vi';

  constructor(
    private traslate: TranslateService,
    private cookieService: CookieService
  ) {
    this.currentLang = this.traslate.currentLang;
    this.traslate.onLangChange.subscribe((lang: any) => {
      if (lang) {
        this.currentLang = lang.lang;
      }
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request) {
      let deviceId = this.cookieService.get('deviceId');
      if (!deviceId || deviceId === '') {
        deviceId = generateUID();
        this.cookieService.set('deviceId', deviceId);
      }
      request = request.clone({
        headers: new HttpHeaders({
          'client-version': 'web',
          'device-id': deviceId,
          language: this.currentLang,
        }),
      });
    }

    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.serverUrl + request.url });
    }
    return next.handle(request);
  }
}
