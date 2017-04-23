import {
  Component,
  OnDestroy,
  HostBinding,
  Input,
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../../shared-services/auth.service';
import {
  User
} from '../../../models/User';
import {
  leftSlideInOutAnimation
} from '../../../shared-animations/animations';

@Component({
  moduleId: module.id,
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [ './side-bar.component.css' ],
  animations: [ leftSlideInOutAnimation ]
})
export class SideBarComponent {

  @HostBinding('@leftSlideInOut') leftSlideInOut = true;
  
  private genNavLinks: { text: string, href: string }[] = [
    { text: 'dashboard', href: '/dashboard' },
  ];
  
  private testNavLinks: { text: string, href: string }[] = [
    { text: 'authorization ', href: '/test-auth'  },
    { text: 'dialog ', href: '/test-dialog' },
    { text: 'animation ', href: '/test-animation' },
    { text: 'title ', href: '/test-title' },
    { text: 'page not found ', href: '/non-existent' },
  ];

}