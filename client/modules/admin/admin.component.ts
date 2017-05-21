
import {
  Component,
  OnInit,
} from '@angular/core';

import {
  ContentComponent,
} from '../../app/components/content/content.component';
import {
  ContentService,
} from '../../services/content.service';
import {
  AuthService
} from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends ContentComponent {

  private header: string = 'Administration';

  private navLinks: { label: string, href: any }[] = [];

  constructor(
    private contentService: ContentService,
    private authService: AuthService
  ) {
    super(contentService);
    contentService.updateHeader(this.header);
    this.setNavLinks();
  }

  setNavLinks() {
    this.navLinks.push({ label: 'Account', href: ['/admin/account', this.authService.getSignedInUser().id] });
    this.navLinks.push({ label: 'Users', href: '/admin/users' });
  }

}