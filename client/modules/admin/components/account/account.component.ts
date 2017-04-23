
import {
  Component,
} from '@angular/core';

import {
  DialogService,
} from '../../../dialog/dialog.module';
// import { YesNoDialogConfig, }  from '../../../dialog/dialog.module';


@Component({
  moduleId: module.id,
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: [ './account.component.css' ]
})
export class AccountComponent {

  private genInfoShow: boolean = false;
  private selectedOption: any;

  private description: string;

  constructor(public dialogService: DialogService) { 
    //defaults
    this.description = 'View and edit your account information.';
  }

  genInfoEdit() {
    this.genInfoShow = !this.genInfoShow;
  }

  genInfoEdit2() {
    let data = {
      title: 'Edit',
      message: 'Are you sure that you are sure about that?',
      confirm:'Of course!'
    };

    let dialogRef = this.dialogService.openDialog(data);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.selectedOption = result;
    });
  }
  
}