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
  AppService
} from '../../../services/app.service';
import {
  AuthService
} from '../../../services/auth.service';
import {
  PlatformService
} from '../../../services/platform.service';
import {
  User
} from '../../../models/User';
// import {
//   leftSlideInOutAnimation
// } from '../../../shared-animations/animations';

@Component({
  moduleId: module.id,
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [ './side-bar.component.css' ],
  // animations: [ leftSlideInOutAnimation ]
})
export class SideBarComponent {

  // @HostBinding('@leftSlideInOut') leftSlideInOut = true;
  
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

  constructor(private appService: AppService, private platformService: PlatformService) { }

  sidenavToggle() {
    if(this.platformService.isMobile())
      this.appService.callSidenavToggleFunc();
  }

}