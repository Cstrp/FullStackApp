import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-orders-chart',
  templateUrl: './orders-chart.component.html',
})
export class OrdersChartComponent implements OnInit {
  public average!: number;

  public chartData!: ChartConfiguration<'line'>['data'];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  public lineChartLegend: boolean = true;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.analyticsService.getAnalytics().subscribe((items) => {
      this.average = items.average;

      const labels = items.chart.map((item) => item.label);
      const data = items.chart.map((item) => item.order);

      this.chartData = {
        labels,
        datasets: [
          {
            data,
            label: 'Orders',
            fill: false,
            backgroundColor: 'rgba(0,144,255,0.5)',
          },
        ],
      };
    });
  }
}
