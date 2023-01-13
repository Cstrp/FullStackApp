import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from '../../models/overview';
import { OverviewService } from '../../services/overview.service';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
})
export class OverviewCardComponent implements OnInit {
  public overviews$: Observable<Overview> = new Observable<Overview>();

  constructor(private overviewService: OverviewService) {}

  ngOnInit(): void {
    this.overviews$ = this.overviewService.getOverview();
  }
}
