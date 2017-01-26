import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthService } from '../auth.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  students;
  jobs;
  // sidenav.toggle()
  constructor(public fb: AngularFire, private router: Router, private authService: AuthService) {
    this.students = [];
    this.jobs = [];
  }

  ngOnInit() {
  }

  showStudents(sidenav: any) {
    this.jobs.length = 0;
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

  showPostedJobs(sidenav: any) {
    this.students.length = 0;
    let currentUser = this.authService.getUserData();
    console.log(currentUser['uid']);
    let jobs = this.fb.database.list('/jobs', {
      query: {
        orderByChild: 'companyId',
        equalTo: currentUser['uid']
      }
    }).subscribe(data => {
      console.log(data);
      this.jobs = data;
      sidenav.toggle();
    });
  }

   signout() {
    this.authService.doUnsubscribe();

    this.router.navigate(['/login'])
  }
}
