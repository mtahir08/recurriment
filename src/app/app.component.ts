import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  items$: FirebaseListObservable<any[]>;
  constructor(public af: AngularFire, private router: Router) {
    this.items$ = af.database.list('/list');
    const promise = af.database.object('/item').remove();
    promise
      .then(data => console.log('success', data))
      .catch(err => console.log(err, 'You dont have access!'));
  }


}
