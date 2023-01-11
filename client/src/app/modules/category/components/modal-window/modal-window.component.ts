import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position';
import { Observable } from 'rxjs';

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
    @Inject(MAT_DIALOG_DATA) public data: Position,
    private dialogRef: MatDialogRef<ModalWindowComponent>,
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
    if (!this.form.valid) {
      return;
    }

    const { title, cost } = this.form.value;
    let updatedPosition: Position;

    if (this.data?.edit) {
      updatedPosition = { _id: this.data._id, title, cost } as Position;
      this.updatePosition(updatedPosition).subscribe((res) => {
        this.dialogRef.close({ position: res, accept: true, edit: this.isEdit });
      });
    } else {
      updatedPosition = { title, cost } as Position;
      this.createPosition(updatedPosition).subscribe((res) => {
        this.dialogRef.close({ position: res, accept: true, edit: this.isEdit });
      });
    }
  }

  decline() {
    this.dialogRef.close(false);
  }

  submit() {
    // if (!this.form.valid) {
    //   return;
    // }
    //
    // if (this.isEdit) {
    //   this.positionService.updatePosition(this.form.value).subscribe(
    //     (result) => {
    //       console.log('Это результат в обновлении!', result);
    //       this.dialogRef.close({ position: result, accept: true });
    //     },
    //     (error) => {
    //       console.log('Error', error);
    //     },
    //   );
    // } else {
    //   let position: Position = {
    //     title: this.form.value.title,
    //     cost: this.form.value.cost,
    //     category: this.data.category,
    //   };
    //
    //   this.positionService.createPosition(position).subscribe(
    //     (result) => {
    //       console.log('Это результат в создании!', result);
    //       this.dialogRef.close({ position: result, accept: false });
    //     },
    //     (error) => {
    //       console.log('Error', error);
    //     },
    //   );
    // }
  }

  private createPosition(position: Position): Observable<Position> {
    return this.positionService.createPosition(position);
  }

  private updatePosition(position: Position): Observable<Position> {
    return this.positionService.updatePosition(position);
  }
}
