import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { filter, Subscription } from 'rxjs';
import { Position } from '../../models/position';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-positions-row',
  templateUrl: './positions-row.component.html',
})
export class PositionsRowComponent implements OnInit, OnDestroy {
  @Input() public _id!: string | undefined;

  public edit: boolean = true;

  public positions: Position[] = [];

  public loading: boolean = false;

  private sub$!: Subscription;

  constructor(
    private positionsService: PositionService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    if (this._id !== undefined) {
      this.positionsService.getAllPositions(this._id).subscribe((position) => {
        this.positions = position;
        this.loading = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.dialog.ngOnDestroy();
  }

  public openDialog(edit: boolean) {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: { _id: this._id, edit: false },
      autoFocus: 'dialog',
      role: 'dialog',
      width: '980px',
    });

    this.sub$ = dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe((result) => {
        const { position, accept } = result;

        this.edit = edit;
        if (accept) {
          this.positionsService.createPosition(position).subscribe(
            (pos) => {
              this.positions.push(pos);
            },
            (error) => {
              this.snackBarService.showBar(error.error.message, 'Close');
            },
          );
          this.snackBarService.showBar('Position has been created', 'Close');
        }
      });
  }

  public selectPosition(position: Position, edit: boolean) {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: { _id: position._id, title: position.title, cost: position.cost, edit: true },
      autoFocus: 'dialog',
      role: 'dialog',
      width: '980px',
    });

    this.sub$ = dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe((result) => {
        // const { position, accept } = result;

        this.edit = edit;

        // if (accept) {
        //   this.positionsService.updatePosition(position).subscribe(
        //     (pos) => {
        //       const idx = this.positions.findIndex((i) => i._id === pos._id);
        //
        //       this.positions[idx] = pos;
        //     },
        //     (error) => this.snackBarService.showBar(error.error.message, 'Close'),
        //   );
        //   this.snackBarService.showBar('Position has been updated', 'Close');
        // }
      });
  }

  deletePosition(position: Position) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete position',
        message: 'Are you sure you want to delete this position?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.positionsService.deletePosition(position).subscribe(() => {
          this.snackBarService.showBar('Position deleted!', 'close');
          this.positions = this.positions.filter((p) => p._id !== position._id);
        });
      }
    });
  }

  public drop(event: CdkDragDrop<Position[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
