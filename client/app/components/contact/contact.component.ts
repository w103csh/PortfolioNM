
import { Component }        from '@angular/core';

import { AuthService }      from '../../../shared-services/auth.service';

import { __apiUrl,
         __resPDF,
         __resDOCX, }       from '../../../APP_CONFIG.ts';
import { Subscription }     from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: [ './contact.component.css', '../../../shared-css/doc.css' ]
})
export class ContactComponent{

  private sub: Subscription;
  private isSignedIn: boolean;
  private readonly _notSignedInClasses: string[];
  private signedInClasses: string[];

  // File download strings
  private url: string = __apiUrl + '/file/download/';
  private fileLocationPDF = this.url + __resPDF;
  private fileLocationDOCX = this.url + __resDOCX;

  constructor(private authService: AuthService) {
    // defaults
    this.isSignedIn= false;
    this._notSignedInClasses = [ 'side-margin' ];

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