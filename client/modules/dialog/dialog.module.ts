
// Angular modules
import { NgModule, }                       from '@angular/core';
import { CommonModule, }                   from '@angular/common';
import { MaterialModule, }                 from '@angular/material';

// Modules

// Services

// Components
// TODO: maybe make the dialog use the dynamic component
import { YesNoDialogComponent, }          from './components/yes-no-dialog/yes-no-dialog.component';

// Exports
export { DialogService }                  from './dialog.service';
// not sure why export section doesn't do this
export { YesNoDialogComponent, }

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    YesNoDialogComponent,
  ],
  declarations: [
    YesNoDialogComponent,
  ],
  entryComponents: [
    YesNoDialogComponent,
  ],
  providers: []
})
export class DialogModule { }