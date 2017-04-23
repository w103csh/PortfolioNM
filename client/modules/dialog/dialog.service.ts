import {
  Component,
  ViewContainerRef,
  ViewChild,
  ReflectiveInjector,
  Injectable
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MdDialogConfig
} from '@angular/material';

import {
  YesNoDialogComponent,
} from './components/yes-no-dialog/yes-no-dialog.component';

@Injectable()
export class DialogService {

  private selectedOption: string;

  constructor(public dialog: MdDialog) { }

  openDialog(data: any): MdDialogRef<YesNoDialogComponent> {

    let config = new MdDialogConfig();
    config.disableClose = true;
    config.data = data;

    return this.dialog.open(YesNoDialogComponent, config);
    
  }

}
