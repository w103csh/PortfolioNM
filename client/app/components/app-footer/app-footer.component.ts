
import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import {
  PlatformService
} from '../../../services/platform.service';
import {
  __version
} from '../../../APP_CONFIG';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: [ './app-footer.component.css' ],
})
export class AppFooterComponent{
  
  @Input() isSignedIn: boolean = false;

  private version: string;
  private footerClasses: string[];
  private mobileClass: string[] = [];

  constructor(private platformService: PlatformService) {
    this.version = __version;
    this.mobileClass = this.platformService.isMobile() ? ['mobile'] : [];
    this.setFooterClasses();
  }

  ngOnChanges() {
    this.setFooterClasses();
  }

  setFooterClasses() {
    if (this.isSignedIn) {
      this.footerClasses = ['flex-container-row', 'center'];
    }
    else {
      this.footerClasses = ['flex-container-row', 'center', 'indent'];
    }
    if (this.platformService.isMobile()) this.footerClasses.push('mobile');
  }
}