
import {
  Component
} from '@angular/core';

import {
  ContentService,
} from '../../services/content.service';

import {
  __apiUrl,
  __resPDF,
  __resDOCX,
} from '../../../APP_CONFIG';

@Component({
  moduleId: module.id,
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: [ './contact.component.css', '../../../shared-css/doc.css' ]
})
export class ContactComponent{

  private header: string = 'Contact me';

  // File download strings
  private url: string = __apiUrl + '/file/download/';
  private fileLocationPDF = this.url + __resPDF;
  private fileLocationDOCX = this.url + __resDOCX;

  constructor(private contentService: ContentService) {
    contentService.updateHeader(this.header);
  }

}