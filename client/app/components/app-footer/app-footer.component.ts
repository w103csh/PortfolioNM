
import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import {
  ContentComponent,
} from '../../components/content/content.component';
import {
  ContentService,
} from '../../../services/content.service';
import {
  __version
} from '../../../APP_CONFIG';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css'],
})
export class AppFooterComponent extends ContentComponent {

  @Input() isSignedIn: boolean = false;
  private footerClasses: string[];

  private version: string;

  constructor(
    private contentService: ContentService,
  ) {
    super(contentService);
    this.version = __version;
    this.setFooterClasses();
  }

  ngOnChanges() {
    this.setFooterClasses();
  }

  setFooterClasses() {
    if (this.isSignedIn) {
      this.footerClasses = ['flex-container-row', 'center'];
    }
    else {
      this.footerClasses = ['flex-container-row', 'center', 'indent'];
    }
    if (this.isMobile) this.footerClasses.push('mobile');
  }
}