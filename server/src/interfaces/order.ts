export interface OrderType {
  user: string;
  date: Date;
  list: OrderItem[];
}
interface OrderItem {
  name: string;
  cost: number;
  quantity: number;
}
