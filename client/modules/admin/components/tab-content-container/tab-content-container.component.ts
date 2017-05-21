
import {
  Component,
  Input
} from '@angular/core';

import {
  ContentComponent,
} from '../../../../app/components/content/content.component';
import {
  ContentService,
} from '../../../../services/content.service';

@Component({
  moduleId: module.id,
  selector: 'tab-content-container',
  templateUrl: './tab-content-container.component.html',
  styleUrls: ['./tab-content-container.component.css']
})
export class TabContentContainerComponent extends ContentComponent {
  @Input() description: string;
}