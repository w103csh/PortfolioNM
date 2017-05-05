
import {
  Component,
  OnInit,
} from '@angular/core';

import {
  ContentService,
} from '../../../../../app/services/content.service';

@Component({
  moduleId: module.id,
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.css' ]
})
export class AdminComponent {

  private header: string = 'Administration';

  private navLinks: { label: string, href: string }[] = [
    { label: 'Account', href: '/admin/account' }
  ];

  constructor(private contentService: ContentService) {
    contentService.updateHeader(this.header);
  }
  
  // TODO: what is this about?
  ngOnInit() {
    if(true)
      this.navLinks.push({ label: 'Users', href: '/admin/users' });
  }

}