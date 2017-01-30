import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';


import { GetDataService } from '../services/get-data.service';
import { LeftSideNavComponent } from '../components/left-side-nav/left-side-nav.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  students$: FirebaseListObservable<any>;
  jobs$: FirebaseListObservable<any>;
  jobs: boolean;
  students: boolean;
  sideNave: boolean;
  rightNave: boolean;
  sendData: Object;
  constructor(public fb: AngularFire, private getDataService: GetDataService) {
    this.sideNave = false;
    this.rightNave = false;
    this.students = false;
    this.jobs = false;
    this.sendData = {
      rightNav: false,
      data: {}
    };
  }

  ngOnInit() {
  }

  showLeftSideBar() {
    this.sideNave = !this.sideNave;
  }

  showRightSideBar(student: any) {
    this.sendData = {
      rightNav: true,
      data: student
    };
    this.rightNave = !this.rightNave;

  }

  checkType(event): void {
    console.log(event);
    this.sideNave = !this.sideNave;
    (event.students) ? this.showStudents() : this.showPostedJobs();
  }

  showStudents() {
    this.jobs = false;
    this.students$ = this.getDataService.getStudentsData();
    this.students = true;
  }

  showPostedJobs() {
    this.students = false;
    this.jobs$ = this.getDataService.getJobsData();
    this.jobs = true;
  }


  closedfn(event) {
    console.log("event", event);
    this.rightNave = !this.rightNave;
  }

}
