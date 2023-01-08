import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AnalyticsPageComponent],
  imports: [CommonModule, SharedModule],
})
export class AnalyticsModule {}
