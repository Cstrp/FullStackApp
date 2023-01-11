import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { of, switchMap } from 'rxjs';
import { SnackBarService } from '../../../../shared/services/snack-bar.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
  public edit: boolean = true;

  public title: string = 'title';

  public imagePreview: string | ArrayBuffer | null | undefined;

  public category!: Category;

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
  });

  private image!: File;

  @ViewChild('file') fileInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.edit = false;

            return this.categoryService.getCategoryById(params['id']);
          }

          return of(null);
        }),
      )
      .subscribe(
        (category) => {
          if (category) {
            this.category = category;
            this.form.patchValue({
              title: category.title,
            });

            this.imagePreview = category.imagesSrc;
          }

          this.form.enable();
        },
        (error) => this.snackBarService.showBar(error.error.message, 'Close'),
      );
  }

  fileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelect(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const reader = new FileReader();

    this.image = file;

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;

    this.form.disable();

    const { title } = this.form.value;

    if (this.edit) {
      obs$ = this.categoryService.createCategory(title, this.image);
      this.snackBarService.showBar('Creation successful', 'close');
    } else {
      obs$ = this.categoryService.updateCategory(this.category._id!, title, this.image);
      this.snackBarService.showBar('Changes save', 'close');
    }

    obs$.subscribe(
      (category) => {
        this.form.enable();
        this.category = category;
      },
      (error) => {
        this.form.enable();
        this.snackBarService.showBar(error.error.message, 'close');
      },
    );
  }
}
