import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OrderPositionsComponent } from './components/order-positions/order-positions.component';
import { OrderCategoriesComponent } from './components/order-categories/order-categories.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent,
    children: [
      {
        path: '',
        component: OrderCategoriesComponent,
      },
      {
        path: ':id',
        component: OrderPositionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
