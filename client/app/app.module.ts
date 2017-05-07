
// Angular modules
import {
  NgModule,
  APP_INITIALIZER,
  OnInit
} from '@angular/core';
import {
  BrowserModule,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
// import { 
// PathLocationStrategy,
// HashLocationStrategy,
// Location,
// LocationStrategy,
// } from '@angular/common';
import {
  FormsModule,
} from '@angular/forms';
import {
  HttpModule,
} from '@angular/http';
import {
  MaterialModule,
} from '@angular/material';

// Modules
import { AppRoutingModule, }                from './app-routing.module';
import { DialogModule }                    from '../modules/dialog/dialog.module';

// // Services
// // import { ConfigService, }                   from '../services/config.service';
// // import { DownloadService, }                 from '../services/download.service';
import { UserService, }                     from '../services/user.service';
import { AuthService, }                     from '../services/auth.service';
import { AuthGuardService, }                from '../services/auth-guard.service';
import { PlatformService, }                 from '../services/platform.service';
import { DialogService }                    from '../modules/dialog/dialog.module';

// Components
import { AppComponent, }                    from './components/app/app.component';
import { DashboardComponent, }              from './components/dashboard/dashboard.component';
import { TestAuthComponent, }               from './components/test-auth/test-auth.component';
import { TestAnimationComponent, }          from './components/test-animation/test-animation.component';
import { TestDialogComponent, }             from './components/test-dialog/test-dialog.component';
import { TestTitleComponent, }              from './components/test-title/test-title.component';
import { TitleBarComponent, }               from './components/title-bar/title-bar.component';
import { TitleBarButtonGroupComponent, }    from './components/title-bar-button-group/title-bar-button-group.component';
import { SideBarComponent, }                from './components/side-bar/side-bar.component';
import { HomeComponent, }                   from './components/home/home.component';
import { AboutComponent, }                  from './components/about/about.component';
import { ContactComponent, }                from './components/contact/contact.component';
import { AppFooterComponent, }              from './components/app-footer/app-footer.component';
import { CollapsibleButtonComponent, }      from './components/collapsible-button/collapsible-button.component';
import { SignInComponent, }                 from './components/sign-in/sign-in.component';
import { SignUpComponent, }                 from './components/sign-up/sign-up.component';
import { PageNotFoundComponent, }           from './components/page-not-found/page-not-found.component';
import { ContentContainerComponent, }       from './components/content-container/content-container.component';
import { DocContentComponent, }             from './components/doc-content/doc-content.component';

// Other libraries
import 'hammerjs';

// TODO: lazy load modules

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
    AppRoutingModule,
    DialogModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    TestAuthComponent,
    TestAnimationComponent,
    TestDialogComponent,
    TestTitleComponent,
    TitleBarButtonGroupComponent,
    TitleBarComponent,
    SideBarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    AppFooterComponent,
    CollapsibleButtonComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    ContentContainerComponent,
    DocContentComponent,
  ],
  providers: [ 
    // Location, { provide: LocationStrategy, useClass: HashLocationStrategy },
    // Location, { provide: LocationStrategy, useClass: PathLocationStrategy },
    // ConfigService, 
    // { 
    //   provide: APP_INITIALIZER, 
    //   useFactory: configServiceFactory, 
    //   deps: [ConfigService],
    //   multi: true
    // },
    // DialogService,
    // DownloadService,
    UserService,
    AuthService,
    AuthGuardService,
    PlatformService,
    DialogService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }