import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  roles: Object;
  constructor(public fb: AngularFire, private router: Router) {
    this.email = "test@gmail.com";
    this.password = "123456";
    this.roles = {
      admin: 'admin',
      company: 'company',
      student: 'dashboard',
    };
  }

  ngOnInit() {
  }

  login() {
    let promise = this.fb.auth.login({ email: this.email, password: this.password },
      { provider: AuthProviders.Password, method: AuthMethods.Password });

    promise
      .then(data => { console.log('login success', data); this.updateUserNode(data); })
      .catch(err => console.log('login error', err));
  }

  updateUserNode(loginData) {
    let obj = {
      login: true,
      // createdAt: this.fb.database.ServerValue.TIMESTAMP,
      // updatedAt:this.fb.database.ServerValue.TIMESTAMP
    }

    let promise = this.fb.database.object('/users/' + loginData.uid);
    promise.update(obj)
      .then(data => this.getUserNode(loginData.uid))
      .catch(err => console.log('data saving error', err));
  }
  getUserNode(uid) {
    let promise = this.fb.database.object('/users/' + uid, { preserveSnapshot: true });
    promise.subscribe(snapshot => {
      console.log(snapshot.key)
      console.log(snapshot.val());
      this.router.navigate(['/', this.roles[snapshot.val().type]]);
    });
  }
}
