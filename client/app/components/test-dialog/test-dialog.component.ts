
import {
  Component
} from '@angular/core';

import {
  DialogService,
} from '../../../modules/dialog/dialog.module';

@Component({
  moduleId: module.id,
  selector: 'test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: [ './test-dialog.component.css', '../../../shared-css/doc.css' ]
})
export class TestDialogComponent{

  private header: string = 'Dialog Service Test';
  private model: any = {};
  private selectedOption: string;

  constructor(public dialogService: DialogService) {
    this.model.showClear = false;
    this.model.confirm = 'Confirm';
    this.model.cancel = 'Cancel';
  }

  testDialog() {
    this.selectedOption = null;
    let dialogRef = this.dialogService.openDialog(this.model);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.selectedOption = result ? 'Confirm' : 'Cancel';
    });
  }
  
}