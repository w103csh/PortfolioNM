
import { Component }          from '@angular/core';

import { AuthService }        from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: [ './auth-home.component.css' ]
})
export class AuthHomeComponent{

  verifyMsg = null;

  constructor(private authService: AuthService) { }

  verify() {

    // loading

    this.authService.verify().subscribe(response => { this.verifyMsg = response },
      err => {
        // TODO: log & something else
        console.log(err);
        this.verifyMsg = 'Server error please try again. If the problem continues contact an administrator.';
      }
    );
  }
}