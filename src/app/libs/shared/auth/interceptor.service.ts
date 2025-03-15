import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const InterceptorService: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });

  return next(modifiedReq);
};
