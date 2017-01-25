import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //name:string;
  //email:string;
  //password:string;
  selectedValue:string;
  types = [];

  constructor() {
    this.selectedValue = "";
    this.types = [
      {value: 'company', viewValue: 'Company'},
      {value: 'student', viewValue: 'Student'}
    ]
  }

  ngOnInit() {
  }

  signup() {
    console.log("");
  }
}
