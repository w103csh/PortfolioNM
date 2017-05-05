
import {
  Injectable,
  OnDestroy,
} from '@angular/core';

import {
  PlatformService,
} from '../../shared-services/platform.service';

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
  private headerSource = new Subject<string>();
  private isDocSource = new Subject<boolean>();

  // Observable streams
  isMobile$ = this.isMobileSource.asObservable();
  header$ = this.headerSource.asObservable();
  isDoc$ = this.isDocSource.asObservable();

  constructor(private platformService: PlatformService) {
    this.updateMobile(platformService.isMobile());
  }

  // Service commands
  updateMobile(isMobile: boolean) {
    this.isMobileSource.next(isMobile);
  }

  updateHeader(header: string) {
    this.headerSource.next(header);
  }

  updateBanner(isDoc: boolean) {
    this.isDocSource.next(isDoc);
  }

}