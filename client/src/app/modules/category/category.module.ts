import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CategoryPageComponent],
  imports: [CommonModule, CategoryRoutingModule, HttpClientModule, SharedModule, MaterialModule],
})
export class CategoryModule {}
