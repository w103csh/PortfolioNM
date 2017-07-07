
import {
  Component
} from '@angular/core';

import {
  ContentComponent,
} from '../../components/content/content.component';
import {
  ContentService,
} from '../../../services/content.service';

import {
  __apiUrl,
  __resPDF,
  __resDOCX,
} from '../../../APP_CONFIG';

@Component({
  moduleId: module.id,
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends ContentComponent {

  private header: string = 'Contact me';

  // File download strings
  private url: string = __apiUrl + '/file/download/';
  private fileLocationPDF = this.url + __resPDF;
  private fileLocationDOCX = this.url + __resDOCX;

  private listItems: { aInnards: string, href: string, linkText: string, target: string }[];

  constructor(
    private contentService: ContentService,
  ) {
    super(contentService);
    contentService.updateHeader(this.header);
    this.setListData();
  }

  setListData() {
    this.listItems = [
      {
        aInnards: '<img src="images/linkedin-box-white.png" />',
        href: 'https://www.linkedin.com/in/colin-hughes-15047a7a',
        linkText: 'See my Linked In profile.',
        target: this.isMobile && false ? null : '_blank',
      },
      {
        aInnards: '<img src="images/github-circle-white.png" />',
        href: 'https://github.com/w103csh/PortfolioNM',
        linkText: 'View, or clone the source code for this website from GitHub.',
        target: this.isMobile && false ? null : '_blank',
      },
      {
        aInnards: '<img src="images/file-pdf-box-white.png" />',
        href: this.fileLocationPDF,
        linkText: 'Download my résumé as a PDF.',
        target: null,
      },
      {
        aInnards: '<img src="images/file-word-box-white.png" />',
        href: this.fileLocationDOCX,
        linkText: 'Download my résumé as a Word document.',
        target: null,
      },
      {
        aInnards: '<img src="images/google-drive-white.png" />',
        href: 'https://docs.google.com/document/d/1zHo4IkVjRJ6FK5dHURe6WPNeCFgC_GZ3KIU0_iH9RaM/edit?usp=sharing',
        linkText: 'See my resume as in Google Docs.',
        target: this.isMobile && false ? null : '_blank',
      },
    ];
  }

}