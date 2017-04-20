
import {
  Component,
  HostBinding,
} from '@angular/core';

import {
  AuthService,
} from '../../../shared-services/auth.service';
import {
  rightSlideInAnimation,
} from '../../../shared-animations/animations';
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
  styleUrls: [ './dashboard.component.css', '../../../shared-css/doc.css' ],
  animations: [ rightSlideInAnimation ]
})
export class DashboardComponent {

  //@HostBinding('@rightSlideIn') rightSlideIn = true;

  private header: string = 'Dashboard';

  private sub: Subscription;
  private user: User;

  constructor(private authService: AuthService) {
    this.sub = authService.signedInUser$.subscribe((user: User) => { this.user = user; });
  }
}