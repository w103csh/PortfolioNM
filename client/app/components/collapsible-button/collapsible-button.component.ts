
import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  ContentComponent,
} from '../../components/content/content.component';
import {
  ContentService,
} from '../../../services/content.service';

var nextId = 0;

@Component({
  moduleId: module.id,
  selector: 'collapsible-button',
  templateUrl: './collapsible-button.component.html',
  styleUrls: [ './collapsible-button.component.css' ]
})
export class CollapsibleButtonComponent extends ContentComponent {
  @Input() targetId: string = `target-${nextId++}`;
  @Input() expandText: string = 'Show details';
  @Input() collapseText: string = 'Hide details';
  @Input() color: string = 'primary';
  @Input() toggleClasses: string[] = ['collapse'];
  @Input() showIcon: boolean = true;
  @Input() expand: boolean = false;
  @Input() breakBeforeTarget: boolean = true;
  @Input() isMobile: boolean;

  ngOnInit() {
    if (this.expand)
      this.toggleClasses.push('in');
  }

  toggle() {
    this.expand = !this.expand;
  }
}