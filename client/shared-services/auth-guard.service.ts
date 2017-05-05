
import {
  Injectable
} from '@angular/core';
import {
  Router,
  Route,
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras
} from '@angular/router';

import {
  AuthService
} from './auth.service';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, redirectUrl?: string): Observable<boolean> | boolean {

    return this.authService.verify()
              .map((response) => {
                if (!response) {
                  this.authService.signout();
                  this.router.navigate(['signin'], { queryParams: { redirectUrl: redirectUrl || state.url } });
                }
                return response;
              })
              .catch(() => {
                this.authService.signout();
                this.router.navigate(['signin']);
                return Observable.of(false);
              });

  }

  // BIG TODO: this is not being called for some reason. 
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    // TODO: maybe setup for more than the one part (e.g., /admin/users gets redirected to /admin)
    return this.canActivate(null, null, `/${route.path}`);
  }
}