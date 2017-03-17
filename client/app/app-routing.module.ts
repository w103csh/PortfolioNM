
import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AuthHomeComponent }        from './components/auth-home/auth-home.component';
import { HomeComponent }            from './components/home/home.component';
import { SignInComponent }          from './components/sign-in/sign-in.component';
import { SignUpComponent }          from './components/sign-up/sign-up.component';
import { PageNotFoundComponent }    from './components/page-not-found/page-not-found.component';
import { AuthGuard }                from './services/auth-guard.service';

const routes: Routes = [
   {
     path: 'auth-home', 
     component: AuthHomeComponent,
     canActivate: [AuthGuard]
   }
  ,{
     path: 'home', 
     component: HomeComponent
   }
  ,{
     path: 'signin',
     component: SignInComponent,
   }
  ,{
     path: 'signup',
     component: SignUpComponent
   }
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
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
