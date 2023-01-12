import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionService } from '../../../category/services/position.service';
import { map, Observable, switchMap } from 'rxjs';
import { Positions } from '../../../../shared/models/positions';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
})
export class OrderPositionsComponent implements OnInit {
  public positions$: Observable<Positions[]> = new Observable<Positions[]>();

  public displayedColumns: string[] = ['name', 'price', 'quantity', 'empty'];

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.getAllPositions(params['id']);
      }),
      map((positions: Positions[]) => {
        return positions.map((position) => {
          position.quantity = 1;

          return position;
        });
      }),
    );
  }

  addToCart(position: Positions) {
    this.orderService.addOrder(position);
    this.snackBarService.showBar(`Added x${position.quantity} positions `, 'Close');
  }
}
