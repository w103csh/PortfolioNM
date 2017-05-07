
import {
  Component
} from '@angular/core';

import {
  AuthService
} from '../../../services/auth.service';
import {
  ContentService,
} from '../../../services/content.service';

import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: [ './page-not-found.component.css', '../../../shared-css/doc.css', '../../../shared-css/doc-mobile.css' ]
})
export class PageNotFoundComponent{

  private header: string = 'Page Not Found';
  private docClass: string[] = [];
  private bannerClass: string[] = [];
  private isMobile: boolean;

  constructor(private authService: AuthService, private contentService: ContentService) {
    contentService.updateHeader(this.header);
    this.docClass = this.contentService.getIsMobile() ? ['doc-content-mobile'] : ['doc-content'];
    this.bannerClass = this.contentService.getIsMobile() ? ['banner-mobile'] : ['banner'];
    this.isMobile = this.contentService.getIsMobile();
  }

}