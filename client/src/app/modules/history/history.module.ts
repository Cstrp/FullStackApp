import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { HistoryRoutingModule } from './history-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { HistoryTitleComponent } from './components/history-title/history-title.component';
import { HistoryFilterComponent } from './components/history-filter/history-filter.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { GetTotalAmountPipe } from './pipe/get-total-amount.pipe';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

@NgModule({
  declarations: [HistoryPageComponent, HistoryListComponent, HistoryTitleComponent, HistoryFilterComponent, GetTotalAmountPipe, ModalWindowComponent],
  imports: [CommonModule, HistoryRoutingModule, SharedModule, MaterialModule],
})
export class HistoryModule {}
