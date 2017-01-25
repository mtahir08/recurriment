import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  selectedValue: string;
  types = [];

  constructor(public fb: AngularFire) {
    this.name = "";
    this.email = "";
    this.password = "";
    this.selectedValue = "";
    this.types = [
      { value: 'company', viewValue: 'Company' },
      { value: 'student', viewValue: 'Student' }
    ]
  }

  ngOnInit() { }

  signup() {
    let promise = this.fb.auth.createUser({ email: this.email, password: this.password });
    promise
      .then(data => { console.log('signup success', data); this.login(data); })
      .catch(err => console.log('signup error', err));
  }

  login(signupData) {

    let promise = this.fb.auth.login({ email: this.email, password: this.password },
      { provider: AuthProviders.Password, method: AuthMethods.Password });

    promise
      .then(data => { console.log('login success', data); this.createUserNode(signupData, data); })
      .catch(err => console.log('login error', err));
  }

  createUserNode(signupData, loginData) {
    let obj = {
      name: this.name,
      email: this.email,
      password: this.password,
      type: this.selectedValue,
      login: true,
      createdAt: this.fb.database.ServerValue.TIMESTAMP,
      updatedAt:this.fb.database.ServerValue.TIMESTAMP
    }

    let promise = this.fb.database.object('/users');
    promise.set(obj);
    promise
      .then(data => console.log('data saved', data))
      .catch(err => console.log('data saving error', err));
  }
  
}
