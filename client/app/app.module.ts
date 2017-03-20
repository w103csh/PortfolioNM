
// Angular modules
import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { HashLocationStrategy
        ,Location
        ,LocationStrategy }             from '@angular/common';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                     from '@angular/http';
import { MaterialModule }                 from '@angular/material';

// App defined modules
import { AppRoutingModule }               from './app-routing.module';
// TODO: should put below into a module
import { AuthHomeComponent }              from './components/auth-home/auth-home.component';
import { AuthHomeChild1Component }        from './components/auth-home-child1/auth-home-child1.component';
import { AuthHomeChild2Component }        from './components/auth-home-child2/auth-home-child2.component';

// App defined services
import { UserService }                    from './services/user.service';
import { AuthService }                    from './services/auth.service';
import { AuthGuard }                      from './services/auth-guard.service';

// App defined components
import { AppComponent }                   from './app.component';
import { TitleBarButtonGroupComponent }   from './components/title-bar-button-group/title-bar-button-group.component';
import { SideBarComponent }               from './components/side-bar/side-bar.component';
import { HomeComponent }                  from './components/home/home.component';
import { SignInComponent }                from './components/sign-in/sign-in.component';
import { SignUpComponent }                from './components/sign-up/sign-up.component';
import { PageNotFoundComponent }          from './components/page-not-found/page-not-found.component';


// other libraries
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule
    ,FormsModule
    ,HttpModule
    ,AppRoutingModule
    ,MaterialModule
  ],
  declarations: [
    AppComponent
    ,AuthHomeComponent
    ,AuthHomeChild1Component
    ,AuthHomeChild2Component
    ,TitleBarButtonGroupComponent
    ,SideBarComponent
    ,HomeComponent
    ,SignInComponent
    ,SignUpComponent
    ,PageNotFoundComponent
  ],
  providers: [ 
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy }
    ,UserService
    ,AuthService
    ,AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }