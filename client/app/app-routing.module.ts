
import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';

// TODO: put into separate routing module
import { AuthHomeComponent }            from './components/auth-home/auth-home.component';
import { AuthHomeChild1Component }      from './components/auth-home-child1/auth-home-child1.component';
import { AuthHomeChild2Component }      from './components/auth-home-child2/auth-home-child2.component';

import { HomeComponent }                from './components/home/home.component';
import { SignInComponent }              from './components/sign-in/sign-in.component';
import { SignUpComponent }              from './components/sign-up/sign-up.component';
import { PageNotFoundComponent }        from './components/page-not-found/page-not-found.component';
import { AuthGuard }                    from '../shared-services/auth-guard.service';

const appRoutes: Routes = [
   {
     path: 'home', 
     component: HomeComponent
   }
  ,{
     path: 'auth-home', 
     component: AuthHomeComponent,
     canActivate: [AuthGuard]
   }
  ,{
     path: 'auth-home-child1',
     component: AuthHomeChild1Component,
     canActivate: [AuthGuard]
   }
  ,{
     path: 'auth-home-child2', 
     component: AuthHomeChild2Component,
     canActivate: [AuthGuard]
   }
  ,{
    path: 'admin',
    loadChildren: 'app/modules/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  }
  ,{
     path: 'signin',
     component: SignInComponent,
   }
  ,{
     path: 'signup',
     component: SignUpComponent
   }
  // These need to be at the bottom of the list. The router returns first match.
  ,{
     path: '', 
     redirectTo: '/home',
     pathMatch: 'full'
   }
  ,{
     path: '**',
     component: PageNotFoundComponent
   }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
