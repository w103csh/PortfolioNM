
import {
  Injectable
} from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import {
  AuthService
} from './auth.service';
import {
  UsersService
} from './users.service';
import {
  User,
  ResponseData,
} from '../models';

import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class UserResolver {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<User[]> | User | User[] {
    var id = route.params['id'];
    return this.usersService.read(id)
      .map((response: ResponseData) => this.parseResponse(id, response))
      .catch(() => { return Observable.of(null); });
  }

  private parseResponse(id: string, response: ResponseData): User {
    if (response.success && (id == this.authService.getSignedInUser().id)) {
      return response.data;
    }
    else if (response.success && (id != this.authService.getSignedInUser().id)) {
      // BIG TODO: this type of thing really needs to be logged.
      // Someone is trying to admin users other than themselves, or something really bad is happening.
      console.log('Don\'t do that!');
      return null;
    }
    else {
      return null;
    }
  }
}
