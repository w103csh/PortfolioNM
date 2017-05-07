
import {
  Component,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  PlatformService,
} from '../../../services/platform.service';

@Component({
  moduleId: module.id,
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css'],
})
export class TitleBarComponent {

  @Input() titleStart: string;
  @Input() titleEnd: string;
  @Input() isSignedIn: boolean;
  @Input() isMobile: boolean;

  private screenWidth: number;

  private navLinks: { text: string, href: string }[] = [
    { text: 'HOME', href: '/home' },
    { text: 'ABOUT', href: '/about' },
    { text: 'CONTACT', href: '/contact' },
    // { text: 'DASHBOARD', href: '/dashboard' },
  ];

  private headerClass: string[] = ['header'];

  constructor(private router: Router) {
    // defaults
    this.isSignedIn = false;
  }

  titleClick() {
    if (this.isSignedIn)
      this.router.navigate(['dashboard']);
    else
      this.router.navigate(['home']);
  }
}