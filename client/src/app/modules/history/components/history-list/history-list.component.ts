import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Order } from '../../../order/models/order';

@Component({
  selector: 'app-history-list',
  styles: [
    `
      .table {
        width: 100%;
      }

      .mat-column-number {
        width: 32px;
        border-right: 1px solid currentColor;
        padding-right: 24px;
        text-align: center;
      }

      .mat-column-empty {
        width: 32px;
        text-align: center;
        font-weight: bold;
      }
    `,
  ],
  templateUrl: './history-list.component.html',
})
export class HistoryListComponent implements OnInit {
  @Input() orders!: Order[];

  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  public displayedColumns: string[] = ['number', 'date', 'time', 'totalAmount', 'empty'];

  public totalLength!: number;

  public pageSize = 5;

  public pageSizeOptions: number[] = [5, 10, 25];

  constructor() {}

  ngOnInit(): void {
    this.totalLength = this.orders.length;
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
