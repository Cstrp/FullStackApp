import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent implements OnInit {
  loading: boolean = false;

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loading = true;
    this.categoryService.getAllCategory().subscribe((i) => {
      this.loading = false;
      this.categories = i;
    });
  }

  drop(event: CdkDragDrop<Category[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }
}
