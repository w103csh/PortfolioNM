
import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { RouterModule }       from '@angular/router';

import { LayoutComponent }    from '../layout/layout.component';
import { TitleBarComponent }  from '../title-bar/title-bar.component';
import { SideBarComponent }   from '../side-bar/side-bar.component';

@NgModule({
  imports: [
    BrowserModule
    ,RouterModule
  ],
  declarations: [
    LayoutComponent
    ,TitleBarComponent
    ,SideBarComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }