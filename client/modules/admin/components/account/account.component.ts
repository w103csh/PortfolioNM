
import { Component }          from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: [ '../../../../shared-css/admin-tab.css', './account.component.css' ]
})
export class AccountComponent {

  private description: string = 'View and edit your account information.'
  private panes = {
    genInfo: {
      title: 'General Infomation',
      isEditable: true
    },
    passwordMgmt: {
      title: 'Password Management',
      isEditable: false
    },
  };
  
}