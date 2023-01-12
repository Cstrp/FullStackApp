import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../../category/models/category';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
})
export class OrderCategoriesComponent implements OnInit {
  public categories$: Observable<Category[]> = new Observable<Category[]>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategory();
  }
}
