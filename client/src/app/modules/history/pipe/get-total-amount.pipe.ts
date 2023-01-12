import { Pipe, PipeTransform } from '@angular/core';
import { OrderList } from '../../order/models/order-list';

@Pipe({
  name: 'getTotalAmount',
})
export class GetTotalAmountPipe implements PipeTransform {
  transform(list: OrderList[]): number {
    return list.reduce((acc, item) => acc + item.cost * item.quantity, 0);
  }
}
