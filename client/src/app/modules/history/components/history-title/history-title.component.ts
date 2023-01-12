import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-history-title',
  templateUrl: './history-title.component.html',
})
export class HistoryTitleComponent {
  showFilter: boolean = this.filterService.showFilter;

  constructor(private filterService: FilterService) {}

  toggleFilter(): void {
    this.filterService.toggleFilter();
  }
}
