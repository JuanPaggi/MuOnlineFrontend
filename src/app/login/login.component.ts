import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ingreso = false;

  constructor() { }

  ngOnInit(): void {
  }

  entro(){
    this.ingreso = true;
  }

  salio(){
    this.ingreso = false;
  }

}
