
import {
  Component
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';

import {
  ContentService,
} from '../../services/content.service';


@Component({
  moduleId: module.id,
  selector: 'test-title',
  templateUrl: './test-title.component.html',
  styleUrls: [ './test-title.component.css', '../../../shared-css/doc.css' ]
})
export class TestTitleComponent{

  private header: string = 'Title Service Test';
  private model: any = {};

  constructor(private titleService: Title, private contentService: ContentService) {
    this.model.title = this.titleService.getTitle();
    contentService.updateHeader(this.header);
  }

  updateTitle() {
    this.titleService.setTitle(this.model.title);
  }
  
}