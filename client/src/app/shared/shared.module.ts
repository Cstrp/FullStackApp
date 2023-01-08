import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AuthenticationLayoutComponent,
    SiteLayoutComponent,
    NotFoundComponent,
    SidebarComponent,
    FloatingButtonComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, RouterOutlet, RouterLinkActive, MaterialModule, RouterLink, NgxSpinnerModule],
  exports: [FloatingButtonComponent, SpinnerComponent],
})
export class SharedModule {}
