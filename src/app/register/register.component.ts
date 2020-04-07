import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateUser } from '../dto/dto_create/CreateUser';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register_form: FormGroup;
  name: String;
  username: String;
  email: String;
  password1: String;
  password2: String;

  htmladd: String;

  constructor(private user_service: UsersService, private router: Router) {}

  ngOnInit() {
    this.register_form = new FormGroup({
      username: new FormControl(Validators.required),
      email: new FormControl(Validators.required),
      password1: new FormControl(Validators.required),
      password2: new FormControl(Validators.required),
    });
  }

  add_user() {
    if (this.password1 == this.password2) {
      if (this.register_form.valid) {
        const user = new CreateUser();
        user.name = this.name;
        user.username = this.username;
        user.email = this.email;
        user.password = this.password1;
        this.user_service.add_user(user).subscribe(
          (response) => {
            console.log(response);
            this.router.navigateByUrl(`/`);
          },
          (err) => {
            if (err.status === 400) {
              console.log('Datos incorrectos');
              console.log(err);
            }
            console.log('Datos incorrectos');
            console.log(err);
          }
        );
      } else {
        // Formulario invalido
        this.htmladd =
          '<div class="alert alert-danger"> Formulario invalido</div>';
      }
    } else {
      this.htmladd =
        '<div class="alert alert-danger">La contrase&ntilde;a no coincide.</div>';
      // Password incorrecto
    }
  }
}
