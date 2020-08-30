import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return throwError(error.statusText);
        }
        const serverError = error.error;
        let modalStateError = '';
        if (error instanceof HttpErrorResponse) {
          const appErr = error.headers.get('Application-Error');
          if (appErr) {
            return throwError(appErr);
          }

          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (
                Object.prototype.hasOwnProperty.call(serverError.errors, key)
              ) {
                modalStateError += serverError.errors[key] + '\n';
              }
            }
          }
        }
        return throwError(modalStateError || serverError || 'Server Error');
      })
    );
  }
}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
