import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Order } from '../../../order/models/order';
import { OrdersService } from '../../../order/services/orders.service';
import { Subject, takeUntil } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Filter } from '../../models/filter';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];

  public loading!: boolean;

  private unsubscribe$: Subject<void> = new Subject<void>();

  private filter: Filter = {};

  constructor(private filterService: FilterService, private orderService: OrdersService) {}

  ngOnInit(): void {
    this.getAllOrders(0, 10);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onPageChange(event: PageEvent) {
    this.getAllOrders(event.pageIndex, event.pageSize);
  }

  applyFilter(filter: Filter) {
    this.filter = filter;

    this.orders = [];
    this.getAllOrders();
  }

  private getAllOrders(offset?: number, limit?: number) {
    const options = Object.assign({}, this.filter, {
      offset,
      limit,
    });

    this.loading = true;

    this.orderService
      .getOrders(options)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((orders) => {
        this.orders = orders;
        this.loading = false;
      });
  }
}
