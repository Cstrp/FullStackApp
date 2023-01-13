import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Filter } from '../../models/filter';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from '../../../../constants/customDate';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: CUSTOM_DATE_FORMATS,
    },
  ],
})
export class HistoryFilterComponent implements OnInit {
  @Output() filterData: EventEmitter<Filter> = new EventEmitter<Filter>();

  public filterForm: FormGroup = new FormGroup({
    order: new FormControl(''),
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  constructor(public filterService: FilterService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      order: ['', [Validators.required, Validators.min(1)]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
  }

  submit() {
    this.filterData.emit(this.filterForm.value);
    this.filterForm.reset();
  }
}
