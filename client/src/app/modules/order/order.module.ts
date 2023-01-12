import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OrderCategoriesComponent } from './components/order-categories/order-categories.component';
import { OrderPositionsComponent } from './components/order-positions/order-positions.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { OrderTitleComponent } from './components/order-title/order-title.component';

@NgModule({
  declarations: [
    OrderPageComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    ModalWindowComponent,
    OrderTitleComponent,
  ],
  imports: [CommonModule, OrderRoutingModule, SharedModule, MaterialModule],
})
export class OrderModule {}
