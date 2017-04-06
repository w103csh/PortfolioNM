
// Angular modules
import { NgModule,
         APP_INITIALIZER }                from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { BrowserAnimationsModule }        from '@angular/platform-browser/animations';
// import { PathLocationStrategy
//         ,HashLocationStrategy
//         ,Location
//         ,LocationStrategy }               from '@angular/common';
import { FormsModule }                    from '@angular/forms';
import { HttpModule }                     from '@angular/http';
import { MaterialModule }                 from '@angular/material';

// App defined modules
import { AppRoutingModule }               from './app-routing.module';
// TODO: should put below into a module
import { AuthHomeComponent }              from './components/auth-home/auth-home.component';
import { AuthHomeChild1Component }        from './components/auth-home-child1/auth-home-child1.component';
import { AuthHomeChild2Component }        from './components/auth-home-child2/auth-home-child2.component';

// App defined shared-services
//import { ConfigService }                  from '../shared-services/config.service';
import { UserService }                    from '../shared-services/user.service';
//import { DialogService }                  from '../shared-services/dialog.service';
import { AuthService }                    from '../shared-services/auth.service';
import { AuthGuard }                      from '../shared-services/auth-guard.service';

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

// function configServiceFactory (config: ConfigService) {
//   return () => config.load();
// }

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AuthHomeComponent,
    AuthHomeChild1Component,
    AuthHomeChild2Component,
    TitleBarButtonGroupComponent,
    SideBarComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent
  ],
  providers: [ 
    // Location, { provide: LocationStrategy, useClass: HashLocationStrategy }
    // Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
    // ConfigService, 
    // { 
    //   provide: APP_INITIALIZER, 
    //   useFactory: configServiceFactory, 
    //   deps: [ConfigService],
    //   multi: true
    // },
    UserService,
    //DialogService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }