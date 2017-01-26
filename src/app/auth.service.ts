import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  userData: Object;
  user: Boolean;
  userDetail$;
  constructor(public af: AngularFire) {
    let state = this.af.auth.subscribe(data => {
      if (data) {
        this.setUser(data);
        let userDetail = this.af.database.object('/users/' + data.uid, { preserveSnapshot: true });
        this.userDetail$ = userDetail.subscribe(snapshot => {
          this.userData = snapshot.val();
        });
      } else {
        this.setUser(null);
        this.userDetail$
      }
    }, error => {
      console.log('User Logged In Error', error)
    });
  }

  setUser(user) {
    this.user = user
  }

  getUser() {
    console.log(this.user);
    if (this.user) return true;
    else return false;
  }

  getUserData() {
    return this.userData;
  }

  doUnsubscribe() {
    console.log("on unsubscribe", this.userDetail$);
    if (this.userDetail$) this.userDetail$.unsubscribe();
        this.af.auth.logout();
  }
}
