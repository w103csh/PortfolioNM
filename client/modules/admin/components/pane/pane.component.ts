
import { Component,
         Input }                    from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pane',
  templateUrl: './pane.component.html',
  styleUrls: [ './pane.component.css' ]
})
export class PaneComponent {
  @Input() title: string;
  @Input() editable: boolean;
}