
import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  PlatformService,
} from '../../../services/platform.service';
import {
  AppService
} from '../../../services/app.service';

@Component({
  moduleId: module.id,
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css'],
})
export class TitleBarComponent {
  @Input() titleStart: string;
  @Input() titleEnd: string;
  @Input() isSignedIn: boolean = false;
  @Input() isMobile: boolean;
  
  private screenWidth: number;

  private navLinks: { text: string, href: string }[] = [
    { text: 'HOME', href: '/home' },
    { text: 'ABOUT', href: '/about' },
    { text: 'CONTACT', href: '/contact' },
  ];

  private headerClass: string[] = ['header'];

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  showSidenavClick() {
    this.appService.callSidenavToggleFunc();
  }

  titleClick() {
    if (this.isMobile && this.appService.isSidenavOpen())
      this.appService.callSidenavToggleFunc();

    if (this.isSignedIn)
      this.router.navigate(['dashboard']);
    else
      this.router.navigate(['home']);
  }
}