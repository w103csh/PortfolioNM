
// Angular modules
import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { MaterialModule }                 from '@angular/material';

// Admin defined modules
import { AdminRoutingModule }             from './admin-routing.module';

// // App defined services
// import { UserService }                    from './services/user.service';
import { AuthService }                    from '../../services/auth.service';
import { AuthGuard }                      from '../../services/auth-guard.service';

// Admin defined components
import { AdminComponent }                 from './admin.component';
import { AccountComponent }               from './components/account/account.component';
import { UsersComponent }                 from './components/users/users.component';
import { TabContentContainerComponent }   from './components/tab-content-container/tab-content-container.component';
import { PaneComponent }                  from './components/pane/pane.component';

@NgModule({
  imports: [
    CommonModule
    ,MaterialModule
    ,AdminRoutingModule
  ],
  declarations: [
    AdminComponent
    ,AccountComponent
    ,UsersComponent
    ,TabContentContainerComponent
    ,PaneComponent
  ],
  providers: [
    AuthService
    ,AuthGuard
  ]
})
export class AdminModule { }