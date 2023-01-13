import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsTitleComponent } from './components/analytics-title/analytics-title.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { GainChartComponent } from './components/gain-chart/gain-chart.component';
import { OrdersChartComponent } from './components/orders-chart/orders-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AnalyticsPageComponent, AnalyticsTitleComponent, GainChartComponent, OrdersChartComponent],
  imports: [CommonModule, AnalyticsRoutingModule, MaterialModule, NgChartsModule],
})
export class AnalyticsModule {}
