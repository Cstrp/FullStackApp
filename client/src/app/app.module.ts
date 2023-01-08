import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignInPageComponent } from './modules/authentication/components/signIn/signIn-page/signIn-page.component';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MaterialModule } from './shared/modules/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    AuthenticationLayoutComponent,
    SiteLayoutComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AuthenticationModule,
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
