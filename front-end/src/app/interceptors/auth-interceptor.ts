import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        alert('Unauthorized! Please login again.');
      }

      if (error.status === 500) {
        alert('Server error!');
      }

      return throwError(() => error);
    }),
  );
};
