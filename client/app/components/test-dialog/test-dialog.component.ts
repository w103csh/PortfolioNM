
import {
  Component
} from '@angular/core';

import {
  DialogService,
} from '../../../modules/dialog/dialog.module';
import {
  ContentService,
} from '../../../services/content.service';

@Component({
  moduleId: module.id,
  selector: 'test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.css']
})
export class TestDialogComponent {

  private header: string = 'Dialog Service Test';
  private mobileClass: string[] = [];
  private model: any = {};
  private selectedOption: string;

  constructor(public dialogService: DialogService, private contentService: ContentService) {
    this.model.showClear = false;
    this.model.confirm = 'Confirm';
    this.model.cancel = 'Cancel';

    contentService.updateHeader(this.header);
    this.mobileClass = contentService.getIsMobile() ? ['mobile'] : [];
  }

  testDialog() {
    this.selectedOption = null;
    let dialogRef = this.dialogService.openDialog(this.model);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.selectedOption = result ? 'Confirm' : 'Cancel';
    });
  }

}