
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  MdButton,
} from '@angular/material';

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

  @ViewChild('toggleButton') toggleButton: MdButton;

  ngOnInit() {
    if (this.expand)
      this.toggleClasses.push('in');
  }

  toggle(event: Event) {
    if (event.srcElement.tagName.toLowerCase() == 'md-icon') {
      this.toggleButton._elementRef.nativeElement.click();
    }
    else {
      this.expand = !this.expand;
    }
  }

  toggleIcon() {
    console.log('here');
  }
}