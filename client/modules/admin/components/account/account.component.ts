
import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  NgForm,
  NgModel,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import {
  MdSelect,
} from '@angular/material';
import {
  ActivatedRoute,
} from '@angular/router';

import {
  ContentComponent,
} from '../../../../app/components/content/content.component';
import {
  ContentService,
} from '../../../../services/content.service';
import {
  DialogService,
} from '../../../dialog/dialog.module';
import {
  UsersService,
} from '../../../../services/users.service';
import {
  AuthService,
} from '../../../../services/auth.service';
import {
  User,
  ResponseData,
} from '../../../../models';
import {
  topSlideIn,
  topSlideInOut,
} from '../../../../shared-animations/animations';
import {
  __USStateList
} from '../../../../APP_CONFIG';

import {
  Observable
} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [topSlideIn],
})
export class AccountComponent extends ContentComponent {

  private description: string = 'View and edit your account information.';

  // TODO: PUT ALL OF THE SIGN IN, SIGN UP, AND NOW ACCOUNT FORM INTO A COMPONENT
  // General Info
  private genInfoBaseModel: User;
  private genInfoModel: User;
  @ViewChild('genInfoForm') genInfoForm: NgForm;
  @ViewChild('firstName') firstName: NgModel;
  @ViewChild('lastName') lastName: NgModel;
  @ViewChild('address') address: NgModel;
  @ViewChild('address2') address2: NgModel;
  @ViewChild('city') city: NgModel;
  @ViewChild('state') state: NgModel;
  @ViewChild('zip') zip: NgModel;
  @ViewChild('phone') phone: NgModel;
  private genInfoControls: NgModel[] = [];
  private genInfoDisableForm = false;
  private genInfoEnabled: boolean = false;
  private genInfoMsg: string;
  private stateList = __USStateList;

  constructor(
    private contentService: ContentService,
    private usersService: UsersService,
    private authService: AuthService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    super(contentService);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      if (data.user) {
        this.setGenInfoModel(data.user);
      }
      else {
        this.genInfoDisableForm = true;
        this.genInfoMsg = 'Error retrieving account information. If the error persists please contact an administrator.';
      }
    });
  }

  ngAfterViewInit() {
    // Create form control arrays.
    //
    // TODO: There has to be a better way to do this. Tried to use the form
    // & form group for a bit, but no luck.
    this.createFormControlArray('genInfo');

    // Disable forms to start
    //this.enableDisableFormControls(this.genInfoControls, false);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if(!this.genInfoEnabled || !this.genInfoForm.dirty || !this.genInfoModel.isDiff(this.genInfoBaseModel)) {
      return true;
    }
    let dialogRef = this.dialogService.openDialog({ message: 'Discard changes?'});
    return dialogRef.afterClosed();
  }

  genInfoOnSubmit() {
    if (!this.genInfoForm.valid) {
      // Do something for validation 
    }
    // TODO: Maybe use immutable.js here in the future since the dirty & pristine and the like aren't cutting it.
    else if (!this.genInfoForm.dirty && !this.genInfoModel.isDiff(this.genInfoBaseModel)) {
      this.genInfoEnableDisable(false);
      this.genInfoMsg = 'No changes have been made.'
    }
    else {
      this.usersService.update(this.genInfoModel).subscribe(
        (response: ResponseData) => {
          if (response.success) {
            this.authService.updateSignedInUser(response.data);
            this.setGenInfoModel(response.data);
            this.genInfoEnableDisable(false);
            // TODO: Anmiate this message to disappear after a few seconds
            this.genInfoMsg = 'Save successful!';
          }
          // show message from the server
          else {
            this.genInfoMsg = response.message;
          }
        },
        (err: any) => {
          // TODO: log & something else
          console.log(err);
          this.genInfoMsg = 'Server error please try again. If the problem continues contact an administrator.';
        }
      );
    }
  }

  setGenInfoModel(user: User) {
    this.genInfoModel = user;
    this.genInfoBaseModel = user.copy();
  }

  resetGenInfoModel() {
    this.genInfoModel = this.genInfoBaseModel.copy();
  }

  genInfoEnableDisable(enable: boolean) {
    this.genInfoMsg = null;
    this.genInfoEnabled = enable;
    this.enableDisableFormControls(this.genInfoControls, enable);
    if(!enable) {
      this.resetGenInfoModel();
    }
  }

  // TODO: There is a better way. No time to spend on this atm.
  createFormControlArray(formName: string) {
    switch (formName) {
      case 'genInfo':
        if(!this.genInfoDisableForm) {
          this.genInfoControls.push(this.firstName);
          this.genInfoControls.push(this.lastName);
          this.genInfoControls.push(this.address);
          this.genInfoControls.push(this.address2);
          this.genInfoControls.push(this.city);
          this.genInfoControls.push(this.state);
          this.genInfoControls.push(this.zip);
          this.genInfoControls.push(this.phone);
        }
        break;
    }
  }

  // TODO: There is a better way. No time to spend on this atm.
  enableDisableFormControls(controls: NgModel[], enable: boolean) {
    controls.forEach((model: NgModel) => {
      if (enable) model.control.enable();
      else model.control.disable();
    });
  }

}