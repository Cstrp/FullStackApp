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
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./modules/overview/overview.module').then((i) => i.OverviewModule),
      },
      {
        path: 'analytics',
        loadChildren: () => import('./modules/analytics/analytics.module').then((i) => i.AnalyticsModule),
      },
      {
        path: 'history',
        loadChildren: () => import('./modules/history/history.module').then((i) => i.HistoryModule),
      },
      {
        path: 'order',
        loadChildren: () => import('./modules/order/order.module').then((i) => i.OrderModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./modules/category/category.module').then((i) => i.CategoryModule),
      },
    ],
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
