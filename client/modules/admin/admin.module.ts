
// Angular modules
import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { MaterialModule }                 from '@angular/material';

// Modules
import { AdminRoutingModule }             from './admin-routing.module';
import { DialogModule }                   from '../dialog/dialog.module';

// Services
// import { UserService }                    from './shared-services/user.service';
import { AuthService }                    from '../../shared-services/auth.service';
import { AuthGuard }                      from '../../shared-services/auth-guard.service';
import { DialogService }                  from '../dialog/dialog.module';

// Components
import { AdminComponent }                 from './admin.component';
import { AccountComponent }               from './components/account/account.component';
import { UsersComponent }                 from './components/users/users.component';
import { TabContentContainerComponent }   from './components/tab-content-container/tab-content-container.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    DialogModule,
  ],
  declarations: [
    AdminComponent,
    AccountComponent,
    UsersComponent,
    TabContentContainerComponent,
  ],
  providers: [
    AuthService,
    DialogService,
    AuthGuard
  ]
})
export class AdminModule { }