import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRoutingModule } from './overview-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';

@NgModule({
  declarations: [OverviewPageComponent],
  imports: [CommonModule, OverviewRoutingModule, SharedModule],
})
export class OverviewModule {}
