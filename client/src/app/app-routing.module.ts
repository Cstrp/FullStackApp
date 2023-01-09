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
        loadChildren: () => import('./modules/overview/overview.module').then((over) => over.OverviewModule),
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('./modules/analytics/analytics.module').then((analytics) => analytics.AnalyticsModule),
      },
      {
        path: 'history',
        loadChildren: () => import('./modules/history/history.module').then((history) => history.HistoryModule),
      },
      {
        path: 'order',
        loadChildren: () => import('./modules/order/order.module').then((order) => order.OrderModule),
      },
      {
        path: 'categories',
        loadChildren: () => import('./modules/category/category.module').then((category) => category.CategoryModule),
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
