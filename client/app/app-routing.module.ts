
import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';

// TODO: put into separate routing module
import { DashboardComponent }           from './components/dashboard/dashboard.component';
import { TestAuthComponent }            from './components/test-auth/test-auth.component';
import { TestTitleComponent }           from './components/test-title/test-title.component';

import { HomeComponent }                from './components/home/home.component';
import { AboutComponent }               from './components/about/about.component';
import { ContactComponent }             from './components/contact/contact.component';
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
     path: 'about', 
     component: AboutComponent,
   }
  ,{
     path: 'contact', 
     component: ContactComponent,
   }
  ,{
     path: 'dashboard', 
     component: DashboardComponent,
     canActivate: [AuthGuard]
   }
  ,{
     path: 'test-auth',
     component: TestAuthComponent,
     canActivate: [AuthGuard]
   }
  ,{
     path: 'test-title', 
     component: TestTitleComponent,
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
