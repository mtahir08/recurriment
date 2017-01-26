import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  roles: Object;
  userData: Object;
  constructor(public fb: AngularFire, private router: Router, private authService: AuthService) {
    this.email = "test@gmail.com";
    this.password = "123456";
    this.roles = {
      admin: 'admin',
      company: 'company',
      student: 'dashboard'
    };
    this.userData;
  }

  ngOnInit() {

  }

  login() {
    let promise = this.fb.auth.login({ email: this.email, password: this.password },
      { provider: AuthProviders.Password, method: AuthMethods.Password });

    promise
      // .then(data => { console.log('login success', data); this.updateUserNode(data); })
      .then(data => { console.log('login success'); this.updateUserNode(data); this.router.navigate(['/', this.roles[this.authService.getUserData()['type']]]);console.log(this.authService.getUserData()['type']) })
      .catch(err => console.log('login error', err));
  }

  updateUserNode(loginData) {
    let obj = {
      isLogin: true,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    }

    let promise = this.fb.database.object('/users/' + loginData.uid);
    promise.update(obj)
      .then(data => console.log("updated!!"))
      .catch(err => console.log('data saving error', err));
  }
  // getUserNode(uid) {
  //   let useData = this.fb.database.object('/users/' + uid, { preserveSnapshot: true })
  //     .subscribe(snapshot => {
  //       console.log(snapshot.key)
  //       console.log(snapshot.val());
  //       this.router.navigate(['/', this.roles[snapshot.val().type]]);
  //       // useData.unsubscribe();    
  //     });
  // }
}
