
import { Component,
         OnInit }             from '@angular/core';
import { Router,
         ActivatedRoute,
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

  private redirectUrl: string;
  private model: User = new User('', '', '');
  private serverMsg: string = null;

  constructor(private authService: AuthService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.authService.signout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/auth-home';
  }

  onSubmit() {
    this.serverMsg = null;
    // TODO: loading

    this.authService.signin(this.model).subscribe(
      (response) => {
        // TODO: move common logic
        if(response && response.success) {
          this.serverMsg = null;
          this.router.navigate([this.redirectUrl]);
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