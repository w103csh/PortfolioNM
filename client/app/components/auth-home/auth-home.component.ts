
import { Component }          from '@angular/core';

import { AuthService }        from '../../../shared-services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: [ './auth-home.component.css', '../../../shared-css/doc.css' ]
})
export class AuthHomeComponent{

  private verifyMsg: string = null;

  constructor(private authService: AuthService) { }

  verify() {

    // loading

    this.authService.verify().subscribe(response => { this.verifyMsg = response.toString() },
      err => {
        // TODO: log & something else
        console.log(err);
        this.verifyMsg = 'Server error please try again. If the problem continues contact an administrator.';
      }
    );
  }
}