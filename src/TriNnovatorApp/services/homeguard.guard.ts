import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { USERNAME } from '../../api.constants';
import { ITERATION } from '../../api.constants';

export const homeguardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  // if (typeof localStorage !== 'undefined') {
    // const userName = localStorage.getItem(USERNAME);
    // const iteration = localStorage.getItem(ITERATION);

    // if (userName && iteration) {
      return true;
    // } else {
    //   router.navigate(['/login']);
    //   return false;
    // }
  // } else {
    // return false;
  // }
};
