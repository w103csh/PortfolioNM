
import { Component }          from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: [ '../../../../shared-css/admin-tab.css', './users.component.css' ]
})
export class UsersComponent {

  private description: string = 'Approve users, administrate their roles, and configure thier editable options.'
  private panes = {
    userList: {
      title: 'User List',
      isEditable: true
    }
  };

}