import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Order } from '../../../order/models/order';
import { OrdersService } from '../../../order/services/orders.service';
import { Subject, takeUntil } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public orders: Order[] = [];

  constructor(private filterService: FilterService, private orderService: OrdersService) {}

  ngOnInit(): void {
    this.getAllOrders(0, 5);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onPageChange(event: PageEvent) {
    this.getAllOrders(event.pageIndex, event.pageSize);
  }

  private getAllOrders(offset: number, limit: number) {
    const options = {
      offset,
      limit,
    };

    this.orderService
      .getOrders(options)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }
}
