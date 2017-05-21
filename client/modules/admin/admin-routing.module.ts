
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AccountComponent } from './components/account/account.component';
import { UsersComponent } from './components/users/users.component';

import { AuthGuard } from '../../services/auth-guard.service';
import { CanDeactivateGuard } from '../../services/can-deactivate-guard.service';
import { UserResolver } from '../../services/user-resolver.service';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'account/:id',
        canActivateChild: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
        component: AccountComponent,
        resolve: {
          user: UserResolver
        }
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
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule,],
})
export class AdminRoutingModule { }
