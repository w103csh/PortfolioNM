
// Angular modules
import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { HashLocationStrategy
        ,Location
        ,LocationStrategy }       from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { MaterialModule }         from '@angular/material';

// App defined modules
import { AppRoutingModule }       from './app-routing.module';

// App defined services
import { UserService }            from './services/user.service';
import { AuthService }            from './services/auth.service';
import { AuthGuard }              from './services/auth-guard.service';

// App defined components
import { AppComponent }           from './app.component';
import { SideBarComponent }       from './components/side-bar/side-bar.component';
import { AuthHomeComponent }      from './components/auth-home/auth-home.component';
import { HomeComponent }          from './components/home/home.component';
import { SignInComponent }        from './components/sign-in/sign-in.component';
import { SignUpComponent }        from './components/sign-up/sign-up.component';
import { PageNotFoundComponent }  from './components/page-not-found/page-not-found.component';

//import { AuthHttp }               from 'angular2-jwt';

// other libraries
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule
    ,FormsModule
    ,HttpModule
    ,AppRoutingModule
    ,MaterialModule
    //,AuthHttp
  ],
  declarations: [
    AppComponent
    ,SideBarComponent
    ,AuthHomeComponent
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