import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  students$: FirebaseListObservable<any>;
  userData: FirebaseListObservable<any>;
  user: Object;
  userDetail$;
  constructor(public af: AngularFire) {
    let state = this.af.auth.subscribe(data => {
      if (data) {
        this.setUser(data);
        this.getUserDetail(data.uid);
      } else {
        this.setUser(null);
        this.userDetail$
      }
    }, error => {
      console.log('User Logged In Error', error)
    });
  }

  getUserDetail(uid): any {
    let userDetail = this.af.database.object('/users/' + uid, { preserveSnapshot: true });
    return new Promise((resolve, reject) => {
      this.userDetail$ = userDetail.subscribe(snapshot => {
        this.userData = snapshot.val();
        resolve(this.userData)
      });
    })
  }
  setUser(user) {
    this.user = user
  }

  getUser(): any {
    console.log(this.user);
    if (this.user) return this.user;
    else return false;
  }

  getUserData(): any {
    if (!this.userData) { return this.getUserDetail(this.user['uid']) }
    else return this.userData;

  }

  doUnsubscribe() {
    console.log("on unsubscribe", this.userDetail$);
    if (this.userDetail$) this.userDetail$.unsubscribe();
    this.af.auth.logout();
  }
}
