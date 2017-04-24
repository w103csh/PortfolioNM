
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationExtras
} from '@angular/router';

import { AuthService } from '../../../shared-services/auth.service';
import { User } from '../../../models/User';
import { ResponseData } from '../../../models/ResponseData';

@Component({
  moduleId: module.id,
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../../../shared-css/form.css', './sign-in.component.css']
})
export class SignInComponent {

  // validation
  private readonly emailRegex: RegExp = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$');
  private emailVal: string;
  private passwordVal: string;

  private redirectUrl: string;
  private model: User;
  private serverMsg: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, public router: Router) {
    // defaults
    this.model = new User('', '', '');
  }

  ngOnInit() {
    this.authService.signout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/dashboard';
  }

  validate(): boolean {
    // TODO: simplify the validation
    let valid = true;

    // email validation
    if (!this.model.email || this.model.email.length < 1) {
      this.emailVal = 'required';
      valid = false;
    }
    else if (!this.emailRegex.test(this.model.email)) {
      this.emailVal = 'email';
      valid = false;
    }
    else {
      this.emailVal = null;
    }

    // password validation
    if (!this.model.password) {
      this.passwordVal = 'required';
      valid = false;
    }
    else if (this.model.password.length < 7) {
      this.passwordVal = 'length';
      valid = false;
    }
    else {
      this.passwordVal = null;
    }

    return valid;
  }

  onSubmit() {
    if (this.validate()) {

      this.authService.signin(this.model).subscribe(
        (response) => {
          // TODO: move common logic
          if (response && response.success) {
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

}