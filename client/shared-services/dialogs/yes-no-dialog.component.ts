
import { Component }          from '@angular/core';
import { MdDialogRef }        from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: [ './yes-no-dialog.component.css' ]
})
export class YesNoDialogComponent {
  constructor(public dialogRef: MdDialogRef<YesNoDialogComponent>) {}
}