import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { HistoryRoutingModule } from './history-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HistoryPageComponent],
  imports: [CommonModule, HistoryRoutingModule, SharedModule],
})
export class HistoryModule {}
