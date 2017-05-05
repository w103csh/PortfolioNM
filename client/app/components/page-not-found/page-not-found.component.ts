
import {
  Component
} from '@angular/core';

import {
  AuthService
} from '../../../shared-services/auth.service';
import {
  ContentService,
} from '../../services/content.service';

import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: [ './page-not-found.component.css', '../../../shared-css/doc.css' ]
})
export class PageNotFoundComponent{

  private header: string = 'Page Not Found';
  private sub: Subscription;
  private isSignedIn: boolean;
  private readonly _notSignedInClasses: string[];
  private signedInClasses: string[];

  constructor(private authService: AuthService, private contentService: ContentService) {
    // defaults
    this.isSignedIn= false;
    this._notSignedInClasses = [ 'side-margin' ];

    this.sub = authService.isSignedIn$.subscribe((isSignedIn: boolean) => { this.isSignedIn = isSignedIn; });
    this.checkSignedIn();

    contentService.updateHeader(this.header);
  }

  checkSignedIn() {
    this.signedInClasses = !this.isSignedIn ? this._notSignedInClasses : [];
  }

  ngDoCheck() {
    this.checkSignedIn();
  }

}