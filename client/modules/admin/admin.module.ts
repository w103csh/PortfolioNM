
// Angular modules
import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { MaterialModule }                 from '@angular/material';

// Admin defined modules
import { AdminRoutingModule }             from './admin-routing.module';

// // App defined shared-services
// import { UserService }                    from './shared-services/user.service';
import { AuthService }                    from '../../shared-services/auth.service';
import { DialogService,
         YesNoDialogComponent }           from '../../shared-services/dialog.service';
import { AuthGuard }                      from '../../shared-services/auth-guard.service';

// Admin defined components
import { AdminComponent }                 from './admin.component';
import { AccountComponent }               from './components/account/account.component';
import { UsersComponent }                 from './components/users/users.component';
import { TabContentContainerComponent }   from './components/tab-content-container/tab-content-container.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AccountComponent,
    UsersComponent,
    TabContentContainerComponent,
    YesNoDialogComponent
  ],
  entryComponents: [
    YesNoDialogComponent
  ],
  providers: [
    AuthService,
    DialogService,
    AuthGuard
  ]
})
export class AdminModule { }