
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
// import {
//   NgModel,
//   FormControl,
// } from '@angular/forms';

import {
  ContentComponent,
} from '../../components/content/content.component';
import {
  ContentService,
} from '../../../services/content.service';
import {
  UsersService
} from '../../../services/users.service';

import {
  User
} from '../../../models/User';

@Component({
  moduleId: module.id,
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../../shared-css/form.css', './sign-up.component.css']
})
export class SignUpComponent extends ContentComponent {

  // @ViewChild('email') email: NgModel;

  // validation
  private readonly emailPattern: string = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  private readonly emailRegex: RegExp = new RegExp(this.emailPattern);
  private emailVal: string;
  private passwordVal: string;

  private model: User = new User('', '', '');
  private serverMsg: string;

  constructor(
    private usersService: UsersService,
    public router: Router,
    private contentService: ContentService
  ) {
    super(contentService);
    this.contentService.updateHeader(this.isMobile ? null : null);
  }

  ngOnInit() {
    // console.log(this.email);
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

      this.usersService.create(this.model).subscribe(
        response => {
          if (response.success) {
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

}