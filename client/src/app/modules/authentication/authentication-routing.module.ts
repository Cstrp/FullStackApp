import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './components/signIn/signIn-page/signIn-page.component';
import { SignUpPageComponent } from './components/signUp/signUp-page/signUp-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInPageComponent,
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}

//
// children: [
//   {
//     path: '',
//     redirectTo: '/sign-in',
//     pathMatch: 'full',
//   },
//   {
//     path: 'sign-in',
//     component: SignInPageComponent,
//   },
//   {
//     path: 'sign-up',
//     component: SignUpPageComponent,
//   },
// ],
