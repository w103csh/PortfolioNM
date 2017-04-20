
import {
  Component,
  Input,
  OnInit
} from '@angular/core';

var nextId = 0;

@Component({
  moduleId: module.id,
  selector: 'collapsible-button',
  templateUrl: './collapsible-button.component.html',
  styleUrls: [ './collapsible-button.component.css' ]
})
export class CollapsibleButtonComponent {
  @Input() targetId: string = `target-${nextId++}`;
  @Input() expandText: string = 'Show details';
  @Input() collapseText: string = 'Hide details';
  @Input() color: string = 'primary';
  @Input() toggleClasses: string[] = ['collapse'];
  @Input() showIcon: boolean = true;
  @Input() expand: boolean = false;
  @Input() breakBeforeTarget: boolean = true;

  constructor() {
    //console.log(nextId);
  }

  ngOnInit() {
    if (this.expand)
      this.toggleClasses.push('in');
  }

  toggle() {
    this.expand = !this.expand;
  }
}