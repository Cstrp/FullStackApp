import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { PositionsRowComponent } from './components/positions-row/positions-row.component';
import { CategoryTitleComponent } from './components/category-title/category-title.component';
import { CategoryInputComponent } from './components/category-input/category-input.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

@NgModule({
  declarations: [
    CategoryPageComponent,
    CategoriesFormComponent,
    PositionsRowComponent,
    CategoryTitleComponent,
    CategoryInputComponent,
    ModalWindowComponent,
  ],
  imports: [CommonModule, CategoryRoutingModule, HttpClientModule, SharedModule, MaterialModule],
})
export class CategoryModule {}
