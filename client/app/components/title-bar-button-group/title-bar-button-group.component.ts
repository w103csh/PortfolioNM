
import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../../shared-services/auth.service';
import {
  User
} from '../../../models/User';

import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'title-bar-button-group',
  templateUrl: './title-bar-button-group.component.html',
  styleUrls: [ './title-bar-button-group.component.css' ],
})
export class TitleBarButtonGroupComponent{

  private userSub: Subscription;
  private user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.userSub = authService.signedInUser$.subscribe((user: User) => { this.user = user; });
  }

  clickAccount() {
    this.router.navigate(['admin/account']);
  }

  clickUsers() {
    this.router.navigate(['admin/users']);
  }

  signInOrOut() {
    if(this.user) {
      this.authService.signout();
    }
    this.router.navigate(['signin']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}