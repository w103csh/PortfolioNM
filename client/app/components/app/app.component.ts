
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
  AuthService,
} from '../../../shared-services/auth.service';
import {
  PlatformService,
} from '../../../shared-services/platform.service';
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
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MdSidenav;

  private titleStart: string;
  private titleEnd: string;
  private title: string;
  private version: string;

  private isMobile: boolean;
  private screenWidth: number;

  private sub: Subscription;
  private isSignedIn: boolean;
  private readonly _notSignedInClasses: string[] = [ 'not-signed-in' ];
  private notSignedInClasses: string[];

  constructor(
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
    
    this.sub = authService.isSignedIn$.subscribe((isSignedIn: boolean) => { this.isSignedIn = isSignedIn; });

    this.setTitle();

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

  // Might need to find a better way to do this. ngOnChanges wasn't working here for some reason.
  // These operations seem pretty quick though.
  ngDoCheck() {
    if (!this.platformService.isMobile()) {
      // Change background color
      this.notSignedInClasses = !this.isSignedIn ? this._notSignedInClasses : [];
    
      // Open or close sidenav
      if(this.isSignedIn && !this.sidenav.opened) {
        this.sidenav.open();
      }
      if(!this.isSignedIn && this.sidenav.opened) {
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

  ngOnInit() {
    if (localStorage.getItem('token'))
      this.authService.verify().subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public setTitle() {
    this.titleStart = __titleStart;
    this.titleEnd = __titleEnd;
    this.title = __titleStart + __titleEnd;
    this.titleService.setTitle(' \\o/ ' + this.title);
  }
}