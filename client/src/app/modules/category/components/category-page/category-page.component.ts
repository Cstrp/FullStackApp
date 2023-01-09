import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent implements OnInit {
  public categories$: Observable<Category[]> = new Observable<Category[]>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategory();
  }

  drop(event: CdkDragDrop<Category[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
