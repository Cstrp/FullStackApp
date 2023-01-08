import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent implements OnInit {
  constructor(private spinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.show();
  }
}
