import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

students;
// sidenav.toggle()
  constructor(public fb: AngularFire) {
    this.students = [];
   }

  ngOnInit() {
  }

  showStudents(sidenav: any) {
    let jobs = this.fb.database.list('/users', {
      query: {
        orderByChild: 'type',
        equalTo: 'student'
      }
    }).subscribe(data => {
      console.log(data);
      this.students = data;
      sidenav.toggle();
    });

  }
}
