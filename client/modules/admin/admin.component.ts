
import {
  Component,
  OnInit,
} from '@angular/core';

import {
  ContentService,
} from '../../services/content.service';

@Component({
  moduleId: module.id,
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.css' ]
})
export class AdminComponent {

  private header: string = 'Administration';
  private docClass: string[] = [];
  private bannerClass: string[] = [];
  private isMobile: boolean;

  private navLinks: { label: string, href: string }[] = [
    { label: 'Account', href: '/admin/account' }
  ];

  constructor(private contentService: ContentService) {
    contentService.updateHeader(this.header);
    
    this.docClass = this.contentService.getIsMobile() ? ['doc-content-mobile'] : ['doc-content'];
    this.bannerClass = this.contentService.getIsMobile() ? ['banner-mobile'] : ['banner'];
    this.isMobile = this.contentService.getIsMobile();
  }
  
  // TODO: what is this about?
  ngOnInit() {
    if(true)
      this.navLinks.push({ label: 'Users', href: '/admin/users' });
  }

}