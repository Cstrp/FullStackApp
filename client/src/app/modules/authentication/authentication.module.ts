import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInFormComponent } from './components/signIn/signIn-form/signIn-form.component';
import { SignInIeComponent } from './components/signIn/signIn-ie/signIn-ie.component';
import { SignInIpComponent } from './components/signIn/signIn-ip/signIn-ip.component';
import { SignUpPageComponent } from './components/signUp/signUp-page/signUp-page.component';
import { SignUpFormComponent } from './components/signUp/sign-up-form/sign-up-form.component';
import { SignUpIpComponent } from './components/signUp/sign-up-ip/sign-up-ip.component';
import { SignUpIeComponent } from './components/signUp/sign-up-ie/sign-up-ie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';

@NgModule({
  declarations: [
    SignInFormComponent,
    SignInIeComponent,
    SignInIpComponent,
    SignUpPageComponent,
    SignUpFormComponent,
    SignUpIpComponent,
    SignUpIeComponent,
  ],
  imports: [CommonModule, AuthenticationRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [SignInFormComponent],
})
export class AuthenticationModule {}
