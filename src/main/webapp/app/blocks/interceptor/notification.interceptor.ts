import { JhiAlertService } from 'ng-jhipster';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private alertService: JhiAlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // eslint-disable-next-line no-console
        // console.info("Event caught by notification interceptor", event);

        if (event instanceof HttpResponse) {
          // eslint-disable-next-line no-console
          console.info('HttpResponse Event caught by notification interceptor', event);
          let alert: string | null = null;
          let alertParams: string | null = null;

          event.headers.keys().forEach(entry => {
            // eslint-disable-next-line no-console
            console.info('Entry caught for notification', entry);

            if (entry.toLowerCase().endsWith('readymoneyfin-alert' || 'app-params')) {
              // eslint-disable-next-line no-console
              console.info('header ends with app alert', entry);
              alert = event.headers.get(entry);
              // eslint-disable-next-line no-console
              console.info('alert from entry', alert);
            } else if (entry.toLowerCase().endsWith('readymoneyfin-params' || 'app-params')) {
              alertParams = decodeURIComponent(event.headers.get(entry)!.replace(/\+/g, ' '));
            }
          });

          if (alert) {
            // eslint-disable-next-line no-console
            console.info('Event caught by notification interceptor', alert, alertParams);
            this.alertService.success(alert, { param: alertParams });
          }
        }
      })
    );
  }
}
