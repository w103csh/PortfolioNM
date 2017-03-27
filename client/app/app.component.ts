
import { Component,
         ElementRef,
         OnDestroy }                  from '@angular/core';
import { //ActivatedRoute, 
         Router }                     from '@angular/router';
import { Title }                      from '@angular/platform-browser';
import { Location }                   from '@angular/common';

import { AuthService }                from '../services/auth.service';
import { User }                       from '../models/User';
import { __titleStart }               from '../APP_CONFIG.ts';
import { __titleEnd }                 from '../APP_CONFIG.ts';

import { Subscription }               from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private titleStart: string
  private titleEnd: string;
  private title: string;

  // service sub members
  private sub: Subscription;
  private isSignedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    // private route: ActivatedRoute,
    private elementRef: ElementRef,
    private titleService: Title
    ) {

    this.sub = authService.isSignedIn$.subscribe(
      (isSignedIn: boolean) => {
        this.isSignedIn = isSignedIn;
      }
    );

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

  public setTitle() {
    this.titleStart = __titleStart;
    this.titleEnd = __titleEnd;
    this.title = __titleStart + __titleEnd;
    this.titleService.setTitle(' \\o/ ' + this.title);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}