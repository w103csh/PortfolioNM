
import { Component }          from '@angular/core';
import { MdDialogRef }        from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: [ './dialog-result.component.css' ]
})
export class DialogResultComponent {
  constructor(public dialogRef: MdDialogRef<DialogResultComponent>) {}
}