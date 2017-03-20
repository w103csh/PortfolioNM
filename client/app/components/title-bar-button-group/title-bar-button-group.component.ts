
import { Component,
         OnDestroy }        from '@angular/core';
import { Router }           from '@angular/router';

import { AuthService }      from '../../services/auth.service';
import { User }             from '../../models/User';

import { Subscription }     from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'title-bar-button-group',
  templateUrl: './title-bar-button-group.component.html',
  styleUrls: [ './title-bar-button-group.component.css' ],
})
export class TitleBarButtonGroupComponent{

  private sub: Subscription;
  private user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.sub = authService.signedInUser$.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }

  signInOrOut() {
    if(this.user) {
      this.authService.signout();
      this.router.navigate(['home']);
    }
    else {
      this.router.navigate(['signin']);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}