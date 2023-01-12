import { Component, Input, OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { Positions } from '../../../../shared/models/positions';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-positions-row',
  templateUrl: './positions-row.component.html',
})
export class PositionsRowComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input() public categoryId!: string | undefined;

  public edit: boolean = true;

  public positions: Positions[] = [];

  public loading: boolean = false;

  constructor(
    private positionsService: PositionService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (this.categoryId) {
      this.positionsService
        .getAllPositions(this.categoryId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((position) => {
          this.positions = position;
          this.loading = false;
        });
    }
  }

  openDialog(edit: boolean, position?: Positions) {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: {
        _id: position?._id,
        title: position?.title,
        cost: position?.cost,
        category: this.categoryId!,
        edit,
      },
      autoFocus: 'dialog',
      role: 'dialog',
      width: '980px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((i) => i),
      )
      .subscribe(
        (result) => {
          if (result && result.accept) {
            if (result.edit) {
              const idx = this.positions.findIndex((i) => i._id === result.p._id);

              this.positions[idx] = result.p;
              this.snackBarService.showBar('Position has been updated!', 'Close');
            } else {
              this.positions.push(result.p);
              this.snackBarService.showBar('Position has been created!', 'Close');
            }
          }
        },
        (error) => this.snackBarService.showBar(error.error.message, 'Close'),
      );
  }

  deletePosition(position: Positions) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this position?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {
          if (result) {
            this.positionsService.removePosition(position).subscribe(() => {
              this.positions = this.positions.filter((p) => p._id !== position._id);
              this.snackBarService.showBar('Position has been deleted!', 'close');
            });
          }
        },
        (error) => this.snackBarService.showBar(error.error.message, 'close'),
      );
  }

  public drop(event: CdkDragDrop<Positions[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
