
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
  private headerSource = new BehaviorSubject<string>('');
  private isDocSource = new BehaviorSubject<boolean>(true);

  // Observable streams
  isMobile$ = this.isMobileSource.asObservable();
  header$ = this.headerSource.asObservable();
  isDoc$ = this.isDocSource.asObservable();

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

  updateIsDoc(isDoc: boolean) {
    this.isDocSource.next(isDoc);
  }

  // Behavior getters
  getIsMobile(): boolean {
    return this.isMobileSource.getValue();
  }

}