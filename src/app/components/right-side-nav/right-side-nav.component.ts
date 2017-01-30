import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.css']
})
export class RightSideNavComponent implements OnInit {
  
  @Input() rightNav: any;
  @ViewChild('rightnav') rightnav;
  @Output() closed = new EventEmitter<Object>();

  record: Object;
  constructor() {
    this.record = {};
  }

  ngOnInit() {
    console.log(this.rightNav);
    (this.rightNav.rightNav) ? this.rightnav.open() : false;
    this.record = this.rightNav.data;
  }

  closedRightNav(rightnav: any) {
    rightnav.close();
    this.closed.emit();
  }
}
