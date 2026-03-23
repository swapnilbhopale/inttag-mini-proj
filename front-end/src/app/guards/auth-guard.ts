import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PreAuthService } from '../Services/pre-auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(PreAuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
