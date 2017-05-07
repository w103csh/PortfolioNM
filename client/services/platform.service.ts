
import {
  Injectable
} from '@angular/core';

@Injectable()
export class PlatformService {
  private mobile: boolean = null;
  private width: number = null;

  isMobile(): boolean {
    if (this.mobile == null) {
      this.mobile = window.mobilecheck() || window.screen.width < 600;
    }
    return this.mobile;
  }

  // TODO: Don't use this unless you fix it.
  getScreenWidth(refresh: boolean = false): number {
    if (this.width == null || refresh) {
        this.width = window.screen.width;
    }
    return this.width;
  }
}