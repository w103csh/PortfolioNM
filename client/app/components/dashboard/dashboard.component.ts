
import {
  Component,
  HostBinding,
} from '@angular/core';

import {
  ContentComponent,
} from '../../components/content/content.component';
import {
  ContentService,
} from '../../../services/content.service';
import {
  AuthService,
} from '../../../services/auth.service';
import {
  PlatformService,
} from '../../../services/platform.service';
import {
  User
} from '../../../models/User';

import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends ContentComponent {

  //@HostBinding('@rightSlideIn') rightSlideIn = true;

  private header: string = 'Dashboard';
  
  private imgStyle: any;

  private userSub: Subscription;
  private user: User;

  constructor(
    private authService: AuthService,
    private contentService: ContentService,
    private platformService: PlatformService,
  ) {
    super(contentService);
    contentService.updateHeader(this.header);

    this.userSub = authService.signedInUser$.subscribe((user: User) => { this.user = user; });

    this.setImgStyles();
  }

  setImgStyles() {
    let sWidth = this.platformService.getScreenWidth();
    let imgWidth = Math.round(sWidth*.4);
    let imgHeight = imgWidth*3;
    this.imgStyle = { 'width.px' : imgWidth, 'height.px' : imgHeight  };
  }
}