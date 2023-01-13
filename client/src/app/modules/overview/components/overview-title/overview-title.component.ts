import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
  selector: 'app-overview-title',
  templateUrl: './overview-title.component.html',
})
export class OverviewTitleComponent implements OnInit {
  public yesterday: Date = new Date();

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  openDialog() {
    this.matDialog.open(ModalWindowComponent, {
      width: '1220px',
      maxWidth: '1440px',
      maxHeight: '600px',
    });
  }
}
