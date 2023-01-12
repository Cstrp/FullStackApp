import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-order-title',
  templateUrl: './order-title.component.html',
})
export class OrderTitleComponent implements OnDestroy {
  @Input() isOrder!: boolean;

  private pending: boolean = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public order: OrderService,
    private dialog: MatDialog,
    private orderService: OrdersService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnDestroy(): void {
    this.dialog.ngOnDestroy();
  }

  public openDialog() {
    this.pending = true;
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: this.pending,
      width: '1220px',
      maxHeight: '700px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result === true) {
          const order: Order = {
            list: this.order.orderList.map((item) => {
              delete item._id;

              return item;
            }),
          };

          this.orderService.createOrder(order).subscribe(
            (newOrder) => {
              this.snackBarService.showBar(`Order №${newOrder.order} has been added`, 'Close');
              this.order.clearOrder();
              this.pending = false;
            },
            (error) => this.snackBarService.showBar(error.error.message, 'Close'),
          );
        }
      });
  }
}
