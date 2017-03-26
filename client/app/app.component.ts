
import { Component,
         OnDestroy }                  from '@angular/core';
import { Router }                     from '@angular/router';

import { AuthService }                from '../services/auth.service';
import { User }                       from '../models/User';

import { Subscription }     from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  titleStart: string = 'portfolio';
  titleEnd: string = 'NM';
  title: string = this.titleStart + this.titleEnd;

  private sub: Subscription;
  private isSignedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.sub = authService.isSignedIn$.subscribe(
      (isSignedIn: boolean) => {
        this.isSignedIn = isSignedIn;
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}