
import { Component }          from '@angular/core';

import { DialogService }      from '../../../../shared-services/dialog.service'

@Component({
  moduleId: module.id,
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: [ './account.component.css' ]
})
export class AccountComponent {

  private description: string = 'View and edit your account information.';

  constructor(public dialogService: DialogService) { }

  genInfoClick() {
    this.dialogService.openDialog();
  }
  
}