import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
})
export class HistoryFilterComponent {
  constructor(public filterService: FilterService) {}
}
