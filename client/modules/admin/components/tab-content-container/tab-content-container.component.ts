
import { Component,
         Input }                    from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tab-content-container',
  templateUrl: './tab-content-container.component.html',
  styleUrls: [ './tab-content-container.component.css' ]
})
export class TabContentContainerComponent {
  @Input() description: string;
}