
import { Component,
         Input,
         OnChanges }            from '@angular/core';

import { __version }            from '../../../APP_CONFIG.ts';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: [ './app-footer.component.css' ],
})
export class AppFooterComponent{
  
  @Input() isSignedIn: boolean = false;

  private version: string;
  private footerClasses: string[] = ['flex-container-row', 'center', 'indent'];

  constructor() {
    this.version = __version;
  }

  ngOnChanges() {
    if (this.isSignedIn) {
      this.footerClasses = ['flex-container-row', 'center'];
    }
    else {
      this.footerClasses = ['flex-container-row', 'center', 'indent'];
    }
  }
}