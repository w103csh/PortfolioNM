
import {
  Component
} from '@angular/core';

import {
  ContentService,
} from '../../../services/content.service';

@Component({
  moduleId: module.id,
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  private header: string = 'Page Not Found';

  constructor(private contentService: ContentService) {
    contentService.updateHeader(this.header);
  }

}