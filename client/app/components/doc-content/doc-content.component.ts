
import {
  Component,
  Input,
} from '@angular/core';

import {
  ContentComponent,
} from '../../components/content/content.component';
import {
  ContentService,
} from '../../../services/content.service';

@Component({
  moduleId: module.id,
  selector: 'doc-content',
  template:
    `
    <div *ngIf='banner' class='banner' [ngClass]=mobileClass >
      <span>
        {{banner}}
        <md-icon *ngIf='showSunny' class='sunny spin' >wb_sunny_48</md-icon>
      </span>
    </div>
    <div class='doc-content' [ngClass]=mobileClass ><ng-content></ng-content></div>
    `,
  // Its a bummer but you have to declare the style files in the parent component.
  // styleUrls: ['./doc-content.component.css', '../../../shared-css/doc-content.css'],
  styleUrls: ['./doc-content.component.css'],
})
export class DocContentComponent extends ContentComponent {
  @Input() banner: string;
  @Input() showSunny: boolean;

  constructor(
    private contentService: ContentService
  ) {
    super(contentService);
  }
}