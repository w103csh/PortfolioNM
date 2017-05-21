
import {
  Injectable,
  OnDestroy,
} from '@angular/core';

import {
  PlatformService,
} from './platform.service';

import {
  Subject,
} from 'rxjs/Subject';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

@Injectable()
export class ContentService {

  // Observable sources
  private isMobileSource = new BehaviorSubject<boolean>(false);
  private headerSource = new BehaviorSubject<string>(null);
  private showSignInOutSource = new BehaviorSubject<boolean>(true);

  // Observable streams
  isMobile$ = this.isMobileSource.asObservable();
  header$ = this.headerSource.asObservable();
  showSignInOut$ = this.showSignInOutSource.asObservable();

  constructor(private platformService: PlatformService) {
    this.updateIsMobile(platformService.isMobile());
  }

  // Service commands
  updateIsMobile(isMobile: boolean) {
    this.isMobileSource.next(isMobile);
  }

  updateHeader(header: string) {
    this.headerSource.next(header);
  }

  updateshowSignInOut(show: boolean) {
    this.showSignInOutSource.next(show);
  }

  // Behavior getters
  getIsMobile(): boolean {
    return this.isMobileSource.getValue();
  }

}