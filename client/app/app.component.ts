
import { Component,
         ElementRef,
         OnDestroy,
         OnInit,
         OnChanges }                  from '@angular/core';

import { //ActivatedRoute, 
         Router }                     from '@angular/router';
import { Title }                      from '@angular/platform-browser';
import { Location }                   from '@angular/common';

import { AuthService }                from '../shared-services/auth.service';
import { User }                       from '../models/User';

import { Subscription }               from 'rxjs/Subscription';

import { __titleStart }               from '../APP_CONFIG.ts';
import { __titleEnd }                 from '../APP_CONFIG.ts';

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
  private contextClasses: string[] = ['below-title', 'flex-container-column'];

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

    if (this.isSignedIn)
      this.contextClasses = ['below-title', 'flex-container-row'];
    else
      this.contextClasses = ['below-title', 'flex-container-column'];

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

  ngOnInit() {
    if (localStorage.getItem('token'))
      this.authService.verify().subscribe();
  }

  ngOnChanges() {
    if (this.isSignedIn)
      this.contextClasses = ['below-title', 'flex-container-row'];
    else
      this.contextClasses = ['below-title', 'flex-container-column'];
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