import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryPageComponent,
  },
  {
    path: 'new',
    component: CategoriesFormComponent,
  },
  {
    path: ':id',
    component: CategoriesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
