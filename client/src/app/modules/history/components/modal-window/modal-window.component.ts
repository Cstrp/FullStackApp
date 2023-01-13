import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';
import { Order } from '../../../order/models/order';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
})
export class ModalWindowComponent implements OnInit {
  public order!: Order;

  public displayedColumns: string[] = ['name', 'quantity', 'price'];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Order,
    private dialogRef: MatDialogRef<ModalWindowComponent>,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.order = this.data;
  }

  accept() {
    this.dialogRef.close(true);
  }
}
