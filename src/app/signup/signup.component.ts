import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

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
  roles = {};

  constructor(public fb: AngularFire, private router: Router) {
    this.name = "";
    this.email = "";
    this.password = "";
    this.selectedValue = "";
    this.types = [
      { value: 'company', viewValue: 'Company' },
      { value: 'student', viewValue: 'Student' }
    ]
    this.roles = {
      admin: 'admin',
      company: 'company',
      student: 'dashboard',
    };

  }

  ngOnInit() { }

  signup() {
    let promise = this.fb.auth.createUser({ email: this.email, password: this.password });
    promise
      .then(data => { console.log('signup success', data); this.loginUser(data); })
      .catch(err => console.log('signup error', err));
  }

  loginUser(signupData) {

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
      type: this.selectedValue,
      isLogin: true,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    }

    let promise = this.fb.database.object('/users/' + signupData.uid);
    promise.set(obj)
      .then(data => { this.router.navigate(['/', this.roles[obj.type]]) })
      .catch(err => console.log('data saving error', err));
  }

}
