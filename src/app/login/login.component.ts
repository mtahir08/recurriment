import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor() {
    this.email = "abc@gmail.com";
    this.password = "123456";
  }

  ngOnInit() {
  }

  login() {

  }
}
