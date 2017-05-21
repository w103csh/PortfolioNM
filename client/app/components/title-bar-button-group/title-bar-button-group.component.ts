
import {
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  AppService
} from '../../../services/app.service';
import {
  AuthService
} from '../../../services/auth.service';
import {
  ContentService
} from '../../../services/content.service';
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

  @Input() isMobile: boolean;
  @ViewChild('mdMenu') mdMenu: any;
  @ViewChild('account') account: any;

  private showSignInOutSub: Subscription;
  private showSignInOut: boolean = true;
  private userSub: Subscription;
  private user: User;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
    private contentService: ContentService,
  ) {
    this.userSub = authService.signedInUser$.subscribe((user: User) => { this.user = user; });
    this.showSignInOutSub = contentService.showSignInOut$.subscribe((show: boolean) => { this.showSignInOut = show; });
  }

  menuClick(context: string) {
    if (this.isMobile && this.appService.isSidenavOpen())
      this.appService.callSidenavToggleFunc();

    switch(context) {
      case 'signInOut':
        if(this.user) {
          this.authService.signOut();
        }
        this.router.navigate(['signin']);
        break;
      case 'account':
        this.router.navigate(['admin/account', this.authService.getSignedInUser().id]);
        break;
      case 'signOut':
        this.router.navigate(['admin/users']);
        break;
    }
  }

  signInOrOut() {
    menuClick('signInOut');
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.showSignInOutSub.unsubscribe();
  }
}