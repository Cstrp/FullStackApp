import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { MaterialModule } from './modules/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AuthenticationLayoutComponent,
    SiteLayoutComponent,
    NotFoundComponent,
    SidebarComponent,
    FloatingButtonComponent,
    SpinnerComponent,
    ConfirmDialogComponent,
  ],
  imports: [CommonModule, RouterOutlet, RouterLinkActive, MaterialModule, RouterLink, NgxSpinnerModule],
  exports: [FloatingButtonComponent, SpinnerComponent],
})
export class SharedModule {}
