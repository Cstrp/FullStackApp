import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  showFilter: boolean = false;

  constructor() {}

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }
}
