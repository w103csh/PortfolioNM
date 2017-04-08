
import { Component,
         Input,
         Injectable, }         from '@angular/core';
import { MdDialogRef }      from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: [ './yes-no-dialog.component.css' ]
})
export class YesNoDialogComponent {

  private config: any;

  constructor(public dialogRef: MdDialogRef<YesNoDialogComponent>) {
    this.setData(this.dialogRef.config && this.dialogRef.config.data);
  }

  setData(data: any) {
    this.config = data || {};

    // defaults
    if(!this.config.title)
      this.config.title = 'Question';
    if(!this.config.message)
      this.config.message = 'Are you sure?';
    if(!this.config.cancel)
      this.config.confirm = 'Confirm';
    if(!this.config.cancel)
      this.config.cancel = 'Cancel';
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }

}