
import {
  Component,
  Input,
  Output,
  DoCheck,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import {
  MdSidenav,
} from '@angular/material';

import {
  ContentComponent,
} from '../../components/content/content.component';
import {
  ContentService,
} from '../../../services/content.service';
import {
  AuthService
} from '../../../services/auth.service';

import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.css'],
})
export class ContentContainerComponent extends ContentComponent {

  private contentClass: string[] = ['content'];

  private isDocSub: Subscription;
  private isDoc: boolean;
  private isSignedInSub: Subscription;
  private isSignedIn: boolean = false;
  private headerSub: Subscription;
  private header: string;

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
  ) {
    super(contentService);
    // This is pretty strange. The above subs don't have to be associated with a change function. The changes happen
    // through interpolation. When the subs below change we want to call a function here in the class, so we need to 
    // call the functions we need in the subscription set logic. ngOnChanges does not fire from a subscription setter!!!
    this.isSignedInSub = authService.isSignedIn$.subscribe((isSignedIn: boolean) => {
      this.isSignedIn = isSignedIn;
      this.setSignedInClasses();
    });
    this.headerSub = contentService.header$.subscribe((header: string) => {
      this.header = header;
      this.checkHeader();
    });
  }

  checkHeader() {
    if (this.header) {
      this.setSignedInClasses();
    }
    else {
      this.contentClass = [];
    }
  }

  // TODO: change these class assignments when you get lodash in
  setSignedInClasses() {
    this.contentClass = (!this.isSignedIn && !this.contentService.getIsMobile()) ? ['content', 'side-margin'] : ['content'];
    // This is strange but necessary
    if (!this.header)
      this.contentClass = [];
  }

  ngOnDestroy() {
    this.isSignedInSub.unsubscribe();
    this.headerSub.unsubscribe();
  }
}