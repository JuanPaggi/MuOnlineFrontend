import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateUser } from '../dto/dto_usuarios/CreateUser';
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
  terminos: boolean;

  logged: boolean;

  htmladd: String;

  constructor(private user_service: UsersService, private router: Router) {
    this.terminos = false;
  }

  ngOnInit() {
    if (this.user_service.getUserLoggedIn()) {
      this.logged = false;
      this.htmladd =
        '<div class="alert alert-danger">Ya estas registrado!</div>';
    } else {
      this.logged = true;
    }
    this.register_form = new FormGroup({
      username: new FormControl(Validators.required),
      email: new FormControl(Validators.required),
      password1: new FormControl(Validators.required),
      password2: new FormControl(Validators.required),
      terminos: new FormControl(Validators.required),
    });
  }

  private verify_email(email: String) {
    return email.includes('@') && email.includes('.com');
  }

  add_user() {
    console.log(this.terminos);
    if (this.terminos) {
      if (this.name.length < 11 && this.name.length > 5) {
        if (this.username.length < 11 && this.name.length > 5) {
          if (this.verify_email(this.email)) {
            if (this.password1.length < 11 && this.name.length > 5) {
              if (this.password1 == this.password2) {
                if (this.register_form.valid) {
                  const user = new CreateUser();
                  user.nombre = this.name;
                  user.usuario = this.username;
                  user.email = this.email;
                  user.clave = this.password1;
                  this.user_service.add_user(user).subscribe(
                    (response) => {
                      this.router.navigateByUrl(`/`);
                    },
                    (err) => {
                      switch (err.status) {
                        case 401:
                          this.htmladd =
                            '<div class="alert alert-danger">Los datos ingresados deben contener al menos 6 caracteres.</div>';
                          break;
                        case 403:
                          this.htmladd =
                            '<div class="alert alert-danger">El usuario o email ingresados ya existen.</div>';
                          break;
                      }
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
            } else {
              this.htmladd =
                '<div class="alert alert-danger">La contrase&ntilde;a debe tener menos de 10 caracteres.</div>';
            }
          } else {
            this.htmladd =
              '<div class="alert alert-danger">El formato del email no es valido.</div>';
          }
        } else {
          this.htmladd =
            '<div class="alert alert-danger">El usuario debe tener menos de 10 caracteres.</div>';
        }
      } else {
        this.htmladd =
          '<div class="alert alert-danger">El nombre debe tener menos de 10 caracteres.</div>';
      }
    } else {
      this.htmladd =
        '<div class="alert alert-danger">Debe aceptar terminos y condiciones.</div>';
    }
  }
}
