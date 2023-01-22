import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-gain-chart',
  templateUrl: './gain-chart.component.html',
})
export class GainChartComponent implements OnInit {
  public average!: number;

  public chartData!: ChartConfiguration<'line'>['data'];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  public lineChartLegend: boolean = true;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getAnalytics().subscribe((items) => {
      if (items) {
        this.average = items.average;

        const labels = items.chart.map((item) => item.label);
        const data = items.chart.map((item) => item.gain);

        this.chartData = {
          labels,
          datasets: [
            {
              data: data ? data : [],
              label: 'Revenue',
              fill: false,
              backgroundColor: 'rgba(191,30,244,0.3)',
            },
          ],
        };
      }
    });
  }
}
