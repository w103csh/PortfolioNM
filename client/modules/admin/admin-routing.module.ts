
import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AdminComponent }           from './admin.component';
import { AccountComponent }         from './components/account/account.component';
import { UsersComponent }           from './components/users/users.component';

import { AuthGuard }                from '../../shared-services/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    children: [
      { 
        path: 'account',
        component: AccountComponent
      },
      { 
        path: 'users',
        canActivateChild: [AuthGuard],
        component: UsersComponent
      },
      { 
        path: '',
        canActivateChild: [AuthGuard],
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
