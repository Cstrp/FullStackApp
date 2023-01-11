import { Component, Input, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';
import { of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-category-title',
  templateUrl: './category-title.component.html',
})
export class CategoryTitleComponent implements OnDestroy {
  @Input() edit!: boolean;

  private sub$!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private snackBarService: SnackBarService,
    private confirmDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.confirmDialog.ngOnDestroy();
  }

  public openDialog() {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this category?',
      },
      autoFocus: 'dialog',
      role: 'dialog',
    });

    this.sub$ = dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteCategory();
        this.router.navigate(['/categories']);
      }
    });
  }

  private deleteCategory() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            return this.categoryService.removeCategory(params['id']);
          }

          return of(null);
        }),
      )
      .subscribe(
        (msg) => {
          if (msg) {
            this.snackBarService.showBar(msg.message, 'Close');
          }
        },
        (error) => this.snackBarService.showBar(error.error.message, 'Close'),
      );
  }
}
