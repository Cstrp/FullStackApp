import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionService } from '../../services/position.service';
import { Positions } from '../../../../shared/models/positions';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
})
export class ModalWindowComponent implements OnInit {
  public isEdit: boolean | undefined;

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
    cost: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Positions,
    private dialogRef: MatDialogRef<ModalWindowComponent>,
    private snackBarService: SnackBarService,
    private fb: FormBuilder,
    private positionService: PositionService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data.title, [Validators.required]],
      cost: [this.data.cost, [Validators.required, Validators.min(1)]],
    });

    this.isEdit = this.data.edit;
  }

  accept() {
    const { title, cost } = this.form.value;

    let position: Positions;

    if (this.data.edit) {
      position = { _id: this.data._id, title, cost } as Positions;

      this.updatePosition(position).subscribe(
        (p) => {
          this.dialogRef.close({ p, accept: true, edit: this.isEdit });
        },
        (error) => this.snackBarService.showBar(error.error.message, 'Close'),
      );
    } else {
      position = { title, cost, category: this.data.category };

      this.createPosition(position).subscribe(
        (p) => {
          this.dialogRef.close({ p, accept: true, edit: this.isEdit });
        },
        (error) => this.snackBarService.showBar(error.error.message, 'Close'),
      );
    }
  }

  decline() {
    this.dialogRef.close(false);
  }

  private createPosition(position: Positions): Observable<Positions> {
    return this.positionService.createPosition(position);
  }

  private updatePosition(position: Positions): Observable<Positions> {
    return this.positionService.updatePosition(position);
  }
}
