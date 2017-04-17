
import { Component } from '@angular/core';

import { AuthService }      from '../../../shared-services/auth.service';
import { Subscription }     from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: [ './page-not-found.component.css', '../../../shared-css/doc.css' ]
})
export class PageNotFoundComponent{

  private sub: Subscription;
  private isSignedIn: boolean;
  private readonly _notSignedInClasses: string[] = [ 'side-margin' ];
  private signedInClasses: string[];

  constructor(private authService: AuthService) {
    this.sub = authService.isSignedIn$.subscribe((isSignedIn: boolean) => { this.isSignedIn = isSignedIn; });
    this.checkSignedIn();
  }

  checkSignedIn() {
    this.signedInClasses = !this.isSignedIn ? this._notSignedInClasses : [];
  }

  ngDoCheck() {
    this.checkSignedIn();
  }

}