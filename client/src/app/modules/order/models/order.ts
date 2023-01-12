import { OrderList } from './order-list';

export interface Order {
  date?: Date;
  order?: number;
  list: OrderList[];
  _id: string;
  user?: string;
}
