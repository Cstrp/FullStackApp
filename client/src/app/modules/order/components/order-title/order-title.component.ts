import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-title',
  templateUrl: './order-title.component.html',
})
export class OrderTitleComponent {
  @Input() isOrder!: boolean;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, public order: OrderService) {}

  public openDialog() {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: {},
      width: '1220px',
      maxHeight: '700px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        console.log(result);
      });
  }
}
