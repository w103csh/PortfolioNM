
import {
  Component
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';

import {
  ContentService,
} from '../../../services/content.service';


@Component({
  moduleId: module.id,
  selector: 'test-title',
  templateUrl: './test-title.component.html',
  styleUrls: [ './test-title.component.css', '../../../shared-css/doc.css', '../../../shared-css/doc-mobile.css' ]
})
export class TestTitleComponent{

  private header: string = 'Title Service Test';
  private docClass: string[] = [];
  private bannerClass: string[] = [];
  private isMobile: boolean;
  private model: any = {};

  constructor(private titleService: Title, private contentService: ContentService) {
    this.model.title = this.titleService.getTitle();
    contentService.updateHeader(this.header);
    
    this.docClass = this.contentService.getIsMobile() ? ['doc-content-mobile'] : ['doc-content'];
    this.bannerClass = this.contentService.getIsMobile() ? ['banner-mobile'] : ['banner'];
    this.isMobile = this.contentService.getIsMobile();
  }

  updateTitle() {
    this.titleService.setTitle(this.model.title);
  }
  
}