import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/modules/material.module';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { HistoryModule } from './modules/history/history.module';
import { OrderModule } from './modules/order/order.module';
import { CategoryModule } from './modules/category/category.module';
import { OverviewModule } from './modules/overview/overview.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AuthenticationModule,
    AnalyticsModule,
    HistoryModule,
    OrderModule,
    CategoryModule,
    OverviewModule,
    NgChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
