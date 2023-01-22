import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) { }

  getOrders(options: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('https://fsfapp.onrender.com/api/order', {
      params: new HttpParams({
        fromObject: options,
      }),
    });
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('https://fsfapp.onrender.com/api/order', order);
  }
}
