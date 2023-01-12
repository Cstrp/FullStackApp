import { Injectable } from '@angular/core';
import { Positions } from '../../../shared/models/positions';
import { OrderList } from '../models/order-list';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public orderList: OrderList[] = [];

  public price: number = 0;

  constructor() {}

  addOrder(positions: Positions) {
    const newOrder = Object.assign(
      {},
      {
        name: positions.title,
        quantity: positions.quantity!,
        cost: positions.cost,
        _id: positions._id!,
      },
    );

    const candidate = this.orderList.find((i) => i._id === positions._id);

    if (candidate) {
      candidate.quantity += newOrder.quantity;
    } else {
      this.orderList.push(newOrder);
    }

    this.getTotalCost();
  }

  removeOrder(orderPosition: Order) {
    const idx = this.orderList.findIndex((i) => i._id === orderPosition._id);

    this.orderList.splice(idx, 1);

    this.getTotalCost();
  }

  clearOrder() {
    this.orderList = [];
    this.price = 0;
  }

  private getTotalCost() {
    this.price = this.orderList.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }
}
