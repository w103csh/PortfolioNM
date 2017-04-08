
import { Component, }          from '@angular/core';

import { DialogService, }      from '../../../dialog/dialog.module';
import { YesNoDialogConfig, }  from '../../../dialog/dialog.module';


@Component({
  moduleId: module.id,
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: [ './account.component.css' ]
})
export class AccountComponent {

  selectedOption: any;

  private description: string = 'View and edit your account information.';

  constructor(public dialogService: DialogService) { }

  genInfoEdit() {

    let data = {
      title: 'Edit',
      message: 'Are you sure that you are sure about that?',
      confirm:'Hell yes!'
    };

    let dialogRef = this.dialogService.openDialog(data);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.selectedOption = result;
    });
    
  }
  
}