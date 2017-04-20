
import {
  Component
} from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';

import {
  AuthService,
} from '../../../shared-services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'test-auth',
  templateUrl: './test-auth.component.html',
  styleUrls: [ './test-auth.component.css', '../../../shared-css/doc.css' ]
})
export class TestAuthComponent{

  private header: string = 'Authorization Service Tester';
  private verifyMsg: string;

  constructor(private router: Router, private authService: AuthService) { }

  verify() {
    this.authService.verify().subscribe(response => { this.verifyMsg = response.toString() },
      err => {
        // TODO: log & something else
        console.log(err);
        this.verifyMsg = 'Server error please try again. If the problem continues contact an administrator.';
      }
    );
  }

}