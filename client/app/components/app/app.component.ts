
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  DoCheck,
  ViewChild,
} from '@angular/core';
import {
  MdSidenav,
} from '@angular/material';
import {
  Router,
} from '@angular/router';
import {
  Title,
} from '@angular/platform-browser';
import {
  Location,
} from '@angular/common';

import {
  AppService
} from '../../../services/app.service';
import {
  AuthService,
} from '../../../services/auth.service';
import {
  PlatformService,
} from '../../../services/platform.service';
import {
  User,
} from '../../../models/User';

import {
  Subscription,
} from 'rxjs/Subscription';

import {
  __titleStart,
  __titleEnd,
} from '../../../APP_CONFIG';

@Component({
  moduleId: module.id,
  selector: 'main-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MdSidenav;

  private titleStart: string;
  private titleEnd: string;
  private title: string;
  private version: string;

  private isMobile: boolean;
  private screenWidth: number;

  private isSignedInSub: Subscription;
  private isSignedIn: boolean;
  private signedInClasses: string[];

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private platformService: PlatformService,
    private router: Router,
    // private route: ActivatedRoute,
    private elementRef: ElementRef,
    private titleService: Title
  ) {

    // defaults
    this.isSignedIn = false;

    this.isMobile = platformService.isMobile();
    this.setTitle();

    this.isSignedInSub = authService.isSignedIn$.subscribe((isSignedIn: boolean) => {
      this.isSignedIn = isSignedIn;
      this.setSignedIn();
    });

    // Should only be set when browser is refreshed, or
    // if someone tries to load the app using a specific url.
    //let redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
    let redirectUrl = this.elementRef.nativeElement.getAttribute('redirectUrl');
    // Below does not work. Seems like it could. Might be worth investigating, but
    // went with the above solution instead.
    // let redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
    if (redirectUrl)
      this.router.navigate([redirectUrl]);

  }

  ngOnInit() {
    // TODO: This maybe should go in the constructor. No time to check now.
    if (localStorage.getItem('token'))
      this.authService.verify().subscribe();
    
    // Hook up sidenav things
    this.appService.setSidenav(this.sidenav);
    this.sidenav.mode = this.platformService.isMobile() ? 'push' : 'side';
  }

  setSignedIn() {
    if (!this.platformService.isMobile()) {
      // Change background color
      this.signedInClasses = !this.isSignedIn ? ['not-signed-in'] : [];

      // Open or close sidenav
      if (this.sidenav && this.isSignedIn && !this.sidenav.opened) {
        this.sidenav.open();
      }
      if (this.sidenav && !this.isSignedIn && this.sidenav.opened) {
        this.sidenav.close();
      }
    }
  }

  showHideSideNav() {
    if (this.sidenav.opened)
      this.sidenav.close();
    else
      this.sidenav.open();
  }

  setTitle() {
    this.titleStart = __titleStart;
    this.titleEnd = __titleEnd;
    this.title = __titleStart + __titleEnd;
    this.titleService.setTitle(' \\o/ ' + this.title);
  }

  ngOnDestroy() {
    this.isSignedInSub.unsubscribe();
  }
}