import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Position } from '../../models/position';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
})
export class ModalWindowComponent implements OnInit, AfterViewInit {
  edit: boolean | undefined = this.data.edit;

  get isEdit() {
    return this.data.edit;
  }

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
    cost: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Position,
    private dialogRef: MatDialogRef<ModalWindowComponent>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private positionService: PositionService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      cost: ['', [Validators.required, Validators.min(1)]],
    });
    console.log(this.data);
  }

  ngAfterViewInit(): void {
    this.edit = this.data.edit;
    this.cdr.detectChanges();

    if (this.data.edit) {
      this.form.patchValue({
        title: this.data.title,
        cost: this.data.cost,
      });
    }
  }

  accept() {
    if (!this.form.valid) {
      return;
    }

    const { title, cost } = this.form.value;

    const newPosition: Position = {
      title,
      cost,
      position: this.data._id ? this.data._id : '',
      edit: this.data.edit,
    };

    this.dialogRef.close({ position: newPosition, accept: true });
  }

  decline() {
    this.dialogRef.close({ accept: false });
  }

  submit() {
    if (this.isEdit) {
      console.log(this.data);
      this.positionService
        .updatePosition({ ...this.data, ...this.form.value })
        .subscribe((position) => this.dialogRef.close({ position }));
    } else {
      this.positionService.createPosition(this.form.value).subscribe((position) => this.dialogRef.close({ position }));
    }
  }
}
