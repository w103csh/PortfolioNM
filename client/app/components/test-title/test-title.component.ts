
import {
  Component
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'test-title',
  templateUrl: './test-title.component.html',
  styleUrls: [ './test-title.component.css', '../../../shared-css/doc.css' ]
})
export class TestTitleComponent{

  private header: string = 'Title Service Tester';

  constructor() { }

}