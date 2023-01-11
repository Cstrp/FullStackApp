import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from '../../models/message';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Message, private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  accept() {
    this.dialogRef.close(true);
  }

  decline() {
    this.dialogRef.close(false);
  }
}
