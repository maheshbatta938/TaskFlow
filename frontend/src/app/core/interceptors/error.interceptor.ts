import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

const AUTH_URLS = ['/auth/login', '/auth/signup'];

// One place that turns every failed HTTP call into a user-facing toast and
// handles session expiry, so feature components don't each write their own
// error-branch UI logic.
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const isAuthEndpoint = AUTH_URLS.some((url) => req.url.includes(url));

        if (err.status === 401 && !isAuthEndpoint) {
          this.authService.clearSession();
          this.router.navigate(['/login']);
        }

        const message = this.extractMessage(err);
        this.notification.error(message);

        return throwError(() => err);
      })
    );
  }

  private extractMessage(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'Unable to reach the server. Check your connection and try again.';
    }
    return err.error?.message || 'Something went wrong. Please try again.';
  }
}
