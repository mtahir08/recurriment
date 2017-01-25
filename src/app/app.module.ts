import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDqoMjTfCG5yQKuUUZ9gKBlYSBqx_jvdh4",
  authDomain: "recurriment-61bc5.firebaseapp.com",
  databaseURL: "https://recurriment-61bc5.firebaseio.com",
  storageBucket: "recurriment-61bc5.appspot.com",
  messagingSenderId: "751772469433"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    // ForgotPasswordComponent,
    DashboardComponent,
    AdminComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
