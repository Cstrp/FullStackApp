import { Component, Inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
})
export class ModalWindowComponent {
  public displayedColumns: string[] = ['name', 'quantity', 'price', 'empty'];

  constructor(
    public order: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private dialogRef: MatDialogRef<ModalWindowComponent>,
    private snackBarService: SnackBarService,
  ) {}

  public accept() {
    this.dialogRef.close(true);
  }

  public decline() {
    this.dialogRef.close(false);
  }

  public removePosition(order: Order): void {
    this.order.removeOrder(order);
    this.snackBarService.showBar('Position has been remove', 'Close');
  }
}
