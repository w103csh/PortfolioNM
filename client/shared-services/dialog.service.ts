import { Component
         ,Input
         ,ViewContainerRef
         ,ViewChild
         ,ReflectiveInjector
         ,Injectable }                    from '@angular/core';
import { MdDialog }                       from '@angular/material';

import { YesNoDialogComponent }           from './dialogs/yes-no-dialog.component';

@Injectable()
export class DialogService {

  private selectedOption: string;

  constructor(public dialog: MdDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(YesNoDialogComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  // confirm(message?: string) {
  //   return new Promise<boolean>(resolve => {
  //     return resolve(window.confirm(message || 'Is it OK?'));
  //   });
  // };

}

export { YesNoDialogComponent } from './dialogs/yes-no-dialog.component';
