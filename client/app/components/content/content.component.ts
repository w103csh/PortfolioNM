
import {
  Component,
} from '@angular/core';

import {
  ContentService,
} from '../../../services/content.service';

@Component({})
export class ContentComponent {

  protected isMobile: boolean = false;
  protected mobileClass: string[];

  constructor(protected childContentService: ContentService) {
    this.isMobile = childContentService.getIsMobile();
    this.mobileClass = childContentService.getIsMobile() ? ['mobile'] : [];
  }

}