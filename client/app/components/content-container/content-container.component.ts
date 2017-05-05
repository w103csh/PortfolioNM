
import {
  Component,
  Input,
  Output,
  OnDestroy,
  DoCheck,
} from '@angular/core';
import {
  MdSidenav,
} from '@angular/material';

import {
  ContentService
} from '../../services/content.service';
import {
  AuthService
} from '../../../shared-services/auth.service';

import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'content-container',
  templateUrl: './content-container.component.html',
  styleUrls: [ './content-container.component.css' ],
  providers: [ContentService],
})
export class ContentContainerComponent {

  private headerWrapperClass: string[] = ['header'];
  private headerClass: string[] = [];

  private isMobileSub: Subscription;
  private isMobile: boolean;
  private headerSub: Subscription;
  private header: string;
  private isSignedInSub: Subscription;
  private isSignedIn: boolean;

  private readonly _notSignedInClasses: string[];
  private signedInClasses: string[];

  constructor(private contentService: ContentService, private authService: AuthService) {
    // defaults
    this.isSignedIn = false;
    this._notSignedInClasses = ['side-margin'];

    this.isMobileSub = contentService.isMobile$.subscribe((isMobile: boolean) => { this.isMobile = isMobile; });
    this.headerSub = contentService.header$.subscribe((header: string) => { this.header = header; });
    this.isSignedInSub = authService.isSignedIn$.subscribe((isSignedIn: boolean) => { this.isSignedIn = isSignedIn; });

    this.checkSignedIn();
    this.setMobileClasses();
  }

  checkSignedIn() {
    this.signedInClasses = !this.isSignedIn ? this._notSignedInClasses : [];
  }

  showSidenavClick() {
    // this.showSidenav.emit(true);
  }

  setMobileClasses() {
    if (this.isMobile) {
      this.headerWrapperClass.push('mobile-header-wrapper');
      this.headerClass.push('mobile-header');
    }
  }

  ngDoCheck() {
    this.checkSignedIn();
  }

  ngOnDestroy() {
    this.isMobileSub.unsubscribe();
    this.headerSub.unsubscribe();
    this.isSignedInSub.unsubscribe();
  }
}