import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CompanyComponent } from './company/company.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
    path: 'dashboard', component: DashboardComponent, children: []
  },
  {
    path: 'company', component: CompanyComponent, children: []
  },
  {
    path: 'admin', component: AdminComponent, children: []
  },
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
