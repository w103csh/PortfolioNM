
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NgModel,
  ValidatorFn,
  AbstractControl,
  NgForm,
} from '@angular/forms'
import {
  Router,
  NavigationExtras
} from '@angular/router';

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

// TODO: move this when you create the form component
// validators
export function regexValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let value = control.value;
    let match = regex.test(value);
    return match ? null : { regex: { value } };
  };
}
// TODO : figure out how to get a dynamic value into this method
// export function matchValidator(confirmValue: any): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } => {
//     let value = control.value;
//     let match = value !== confirmValue;
//     return match ? null : { match: { value } };
//   };
// }

@Component({
  moduleId: module.id,
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../../shared-css/form.css', './sign-up.component.css']
})
export class SignUpComponent extends ContentComponent {

  @ViewChild('signUpForm') signUpForm: NgForm;
  @ViewChild('email') email: NgModel;
  @ViewChild('password') password: NgModel;
  @ViewChild('confirmPassword') confirmPassword: NgModel;

  // validation
  private readonly emailPattern: string = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  private readonly emailRegex: RegExp = new RegExp(this.emailPattern);
  private emailVal: string;
  private passwordVal: string;
  private confirmPasswordVal: string;

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
    // validators
    this.email.control.setValidators(regexValidator(this.emailRegex));
    // this.confirmPassword.control.setValidators(matchValidator(this.password.value));
  }

  validate(): boolean {
    // TODO: create a validator

    // confirm password validation
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.control.setErrors({ match: true });
    }
    else {
      this.confirmPassword.control.clearValidators();
    }

    return (!Boolean(this.email.errors)
      && !Boolean(this.password.errors)
      && !Boolean(this.confirmPassword.errors));
  }

  onSubmit() {
    // TODO: signUpForm validate
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