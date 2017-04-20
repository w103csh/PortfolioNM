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
    { text: 'authorization test', href: '/test-auth'  },
    { text: 'title test', href: '/test-title' },
    { text: 'animation test', href: '/test-animation' },
  ];

}