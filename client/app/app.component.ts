
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  DoCheck
} from '@angular/core';

import {
  Router
} from '@angular/router';
import {
  Title
} from '@angular/platform-browser';
import {
  Location
} from '@angular/common';

import {
  AuthService
} from '../shared-services/auth.service';
import {
  User
} from '../models/User';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  __titleStart,
  __titleEnd
} from '../APP_CONFIG';

@Component({
  moduleId: module.id,
  selector: 'main-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  private titleStart: string
  private titleEnd: string;
  private title: string;
  private version: string;

  private sub: Subscription;
  private isSignedIn: boolean;
  private readonly _notSignedInClasses: string[] = [ 'signed-in' ];
  private signedInClasses: string[];

  constructor(
    private authService: AuthService,
    private router: Router,
    // private route: ActivatedRoute,
    private elementRef: ElementRef,
    private titleService: Title
    ) {

    // defaults
    this.isSignedIn = false;

    this.sub = authService.isSignedIn$.subscribe((isSignedIn: boolean) => { this.isSignedIn = isSignedIn; });
    this.checkSignedIn();

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

  checkSignedIn() {
    this.signedInClasses = !this.isSignedIn ? this._notSignedInClasses : [];
  }

  ngDoCheck() {
    this.checkSignedIn();
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