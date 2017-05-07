
import {
  Component,
} from '@angular/core';

import {
  PlatformService
} from '../../../services/platform.service';

@Component({
  moduleId: module.id,
  selector: 'doc-content',
  template: '<div [ngClass]=docClass><ng-content></ng-content></div> ',
  // Its a bummer but you have to declare the style files in the parent component.
  // styleUrls: ['./doc-content.component.css', '../../../shared-css/doc-content.css'],
  styleUrls: ['./doc-content.component.css'],
})
export class DocContentComponent {

  private docClass: string[] = ['doc-content'];

  constructor(private platformService: PlatformService) {
    if (this.platformService.isMobile()) this.docClass.push('mobile');
  }
}