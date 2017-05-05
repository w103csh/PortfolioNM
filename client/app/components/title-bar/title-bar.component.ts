
import {
  Component,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  PlatformService,
} from '../../../shared-services/platform.service';

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

  private isMobile: boolean;
  private screenWidth: number;

  private navLinks: { text: string, href: string }[] = [
    { text: 'HOME', href: '/home' },
    { text: 'ABOUT', href: '/about' },
    { text: 'CONTACT', href: '/contact' },
  ];

  private headerClass: string[] = ['header'];

  constructor(private router: Router, private platformService: PlatformService) {
    // defaults
    this.isSignedIn = false;

    this.isMobile = platformService.isMobile();
  }

  titleClick() {
    if (this.isSignedIn)
      this.router.navigate(['dashboard']);
    else
      this.router.navigate(['home']);
  }
}