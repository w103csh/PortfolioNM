
import { Component,
         OnInit }             from '@angular/core';
import { Router,
         NavigationExtras }   from '@angular/router';

import { AuthService }        from '../../../services/auth.service';
import { User }               from '../../../models/User';
import { ResponseData }       from '../../../models/ResponseData';

@Component({
  moduleId: module.id,
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [ '../../../shared-css/form.css', './sign-in.component.css' ]
})
export class SignInComponent{

  // TODO TODO TODO TODO TODO TODO TODO TODO: RemeberMeToken
  model = new User('', '', '');
  serverMsg = null;

  constructor(private authService: AuthService, public router: Router) {

  }

  ngOnInit() {
    this.authService.signout();
  }

  onSubmit() {
    this.serverMsg = null;
    
    // TODO: loading

    this.authService.signin(this.model).subscribe(
      (response) => {
        // TODO: move common logic
        if(response && response.success) {
          this.serverMsg = null;
          this.router.navigate(['/auth-home']);
        }
        // show message from the server
        else {
          // // TODO: log
          // if (!response.message) console.log('Unknown issue. Contact an administrator.')
          this.serverMsg = response.message || 'Unknown issue. Contact an administrator.';
        }
      },
      (err) => {
        // TODO: log & something else
        console.log(err);
        this.serverMsg = 'Server error please try again. If the problem continues contact an administrator.';
      }
    );

  }

}