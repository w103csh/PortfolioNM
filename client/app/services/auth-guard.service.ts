
import { Injectable }               from '@angular/core';
import { Router,
         Route,
         CanActivate,
         CanActivateChild,
         CanLoad,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         NavigationExtras }         from '@angular/router';

import { AuthService }              from './auth.service';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.authService.redirectUrl = state.url;
    // TODO: might need to move this logic into function;
    return this.authService.verify()
              .map((response) => {
                if (!response) {
                  this.authService.signout();
                  this.router.navigate(['signin']);
                }
                return response;
              })
              .catch(() => {
                this.authService.signout();
                this.router.navigate(['signin']);
                return Observable.of(false);
              });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> |  boolean {
    this.authService.redirectUrl  = `/${route.path}`;
    return this.canActivate(null, null);
  }
}