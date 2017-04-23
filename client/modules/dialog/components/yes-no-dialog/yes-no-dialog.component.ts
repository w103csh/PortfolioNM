
import {
  Component,
  Input,
  Injectable,
  OnInit,
} from '@angular/core';
import {
  MdDialogRef
} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: [ './yes-no-dialog.component.css' ]
})
export class YesNoDialogComponent {

  private config: any;

  constructor(public dialogRef: MdDialogRef<YesNoDialogComponent>) {
    let data = this.dialogRef._containerInstance.dialogConfig && this.dialogRef._containerInstance.dialogConfig.data;
    this.setData(data);
  }

  setData(data: any) {
    this.config = data || {};

    // defaults
    if(!this.config.cancel)
      this.config.confirm = 'Confirm';
    if(!this.config.cancel)
      this.config.cancel = 'Cancel';
    if(typeof this.config.showClear === undefined || typeof this.config.showClear === null)
      this.config.showClear = false;
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }

}