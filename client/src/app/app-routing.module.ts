import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './modules/authentication/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationLayoutComponent,
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then((auth) => auth.AuthenticationModule),
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
