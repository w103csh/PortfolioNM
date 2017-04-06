
import { Component }          from '@angular/core';
import { Router,
         NavigationExtras }   from '@angular/router';
import { UserService }        from '../../../shared-services/user.service';

import { User }               from '../../../models/User';

@Component({
  moduleId: module.id,
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ '../../../shared-css/form.css', './sign-up.component.css' ]
})
export class SignUpComponent{

  model = new User('', '', '');
  serverMsg = null;

  constructor(private userService: UserService, public router: Router) { }

  onSubmit() {

    this.userService.create(this.model).subscribe(
      response => {
        if(response.success) {
          this.serverMsg = null;
          this.router.navigate(['signin']);
        }
        // show message from the server
        else {
          // // TODO: log
          // if (!response.message) console.log('Unknown issue. Contact an administrator.')
          this.serverMsg = response.message || 'Unknown issue. Contact an administrator.';
        }
      },
      err => {
        // TODO: log & something else
        console.log(err);
        this.serverMsg = 'Server error please try again. If the problem continues contact an administrator.';
      }
    );

  }

}