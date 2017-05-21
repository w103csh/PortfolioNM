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
// import {
//   leftSlideInOutAnimation
// } from '../../../shared-animations/animations';

@Component({
  moduleId: module.id,
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  // animations: [ leftSlideInOutAnimation ]
})
export class SideBarComponent {

  // @HostBinding('@leftSlideInOut') leftSlideInOut = true;
  @Input() isSignedIn: boolean;
  @Input() isMobile: boolean;

  private genNavLinks: { text: string, href: string }[] = [];
  private testNavLinks: { text: string, href: string }[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.setLinks();
  }

  ngOnChanges() {
    this.setLinks();
  }

  setLinks() {
    this.genNavLinks = [];
    this.testNavLinks = [];

    if (this.isMobile) {
      this.genNavLinks.push({ text: 'home', href: '/home'});
      this.genNavLinks.push({ text: 'about', href: '/about'});
      this.genNavLinks.push({ text: 'contact', href: '/contact'});
    }

    if (!this.isMobile || (this.isMobile && this.isSignedIn)) {
      this.genNavLinks.push({ text: 'dashboard', href: '/dashboard'});
      this.testNavLinks.push({ text: 'authorization', href: '/test-auth'});
      this.testNavLinks.push({ text: 'dialog', href: '/test-dialog'});
      this.testNavLinks.push({ text: 'animation', href: '/test-animation'});
      this.testNavLinks.push({ text: 'title', href: '/test-title'});
      this.testNavLinks.push({ text: 'page not found', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
      // this.testNavLinks.push({ text: 'page not found ', href: '/non-existent'});
    }
  }

  sidenavToggle() {
    if (this.isMobile)
      this.appService.callSidenavToggleFunc();
  }

}