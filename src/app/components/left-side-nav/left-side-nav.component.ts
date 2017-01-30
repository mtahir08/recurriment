import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-left-side-nav',
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.css']
})
export class LeftSideNavComponent implements OnInit {
  @Input() sideNav: any;
  @ViewChild('sidenav') sidenav;
  @Output() data = new EventEmitter<Object>();

  name: Object;
  constructor(private router: Router, private authService: AuthService) {
    this.name = {
      students: false,
      job: false
    }
  }

  ngOnInit() {
    (this.sideNav) ? this.sidenav.open() : false;
  }

  showStudents() {
    this.sidenav.toggle();
    this.name['students'] = true;
    this.name['job'] = false;
    this.data.emit(this.name);
  }

  showPostedJobs() {
    this.sidenav.toggle();
    this.name['job'] = true;
    this.name['students'] = false;
    this.data.emit(this.name);
  }

  signout() {
    this.authService.doUnsubscribe();
    this.router.navigate(['/login']);
  }
}
