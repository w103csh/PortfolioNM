
import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AdminComponent }           from './admin.component';
import { AccountComponent }         from './components/account/account.component';
import { UsersComponent }           from './components/users/users.component';

import { AuthGuardService }                from '../../services/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    canActivateChild: [AuthGuardService],
    children: [
      { 
        path: 'account',
        canActivateChild: [AuthGuardService],
        component: AccountComponent
      },
      { 
        path: 'users',
        canActivateChild: [AuthGuardService],
        component: UsersComponent
      },
      { 
        path: '',
        canActivateChild: [AuthGuardService],
        component: AccountComponent
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
