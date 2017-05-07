
import {
  Injectable,
  OnDestroy,
} from '@angular/core';
import {
  MdSidenav,
} from '@angular/material';

@Injectable()
export class AppService {
  
  // Events
  private sidenav: MdSidenav;

  setSidenav(sidenav: MdSidenav) {
    this.sidenav = sidenav;
  }

  callSidenavToggleFunc() {
    this.sidenav.toggle();
  }

}