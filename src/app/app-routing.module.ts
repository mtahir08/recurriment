import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes:Routes = [
  {
    path: 'login', component: LoginComponent, children: []
  },
  {
    path: 'signup', component: SignupComponent, children: []
  },
  // {
  //   path: 'forgotPassword', component: ForgotPasswordComponent, children: []
  // },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
