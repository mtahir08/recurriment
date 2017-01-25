import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  selectedValue: string;
  types = [];

  constructor(public fb: AngularFire) {
    this.name = "";
    this.email = "";
    this.password = "";
    this.selectedValue = "";
    this.types = [
      { value: 'company', viewValue: 'Company' },
      { value: 'student', viewValue: 'Student' }
    ]
  }

  ngOnInit() {}

  signup() {
    this.fb.auth.createUser({ email: this.email, password: this.password })
    .then(data => {

    })
    .catch(error=>{
      
    });
  }




}
