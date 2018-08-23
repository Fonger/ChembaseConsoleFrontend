import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token?: String
  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.getValue()
        }
      })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    })
    return next.handle(request)
  }
}
