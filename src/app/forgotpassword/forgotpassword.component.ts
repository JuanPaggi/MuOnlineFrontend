import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { UsuarioEditDto } from '../dto/dto_usuarios/UsuarioEditDto';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  public username: String;
  public htmladd: String;
  public boton: String;
  public boton_enabled: boolean;

  constructor(private usersSrv: UsersService) {
    this.boton = 'Enviar';
    this.boton_enabled = true;
    this.username = '';
  }

  ngOnInit(): void {}

  password_reset_request() {
    this.boton_enabled = false;
    this.boton =
      '<span class="spinner-border spinner-border-sm mb-1"></span> Loading...';
    if (this.username.length > 5 && this.username.length < 16) {
      let user = new UsuarioEditDto();
      user.dato = this.username;
      this.usersSrv.forgot_password(user).subscribe(
        (response) => {
          this.boton = 'Enviar';
          this.boton_enabled = true;
          this.htmladd =
            '<div class="alert alert-success">Se ha enviado un codigo de recuperacion a tu email.</div>';
        },
        (err) => {
          switch (err.status) {
            case 500:
              this.htmladd =
                '<div class="alert alert-danger">Ocurrio un error inesperado, intente nuevamente mas tarde.</div>';
            case 404:
              this.htmladd =
                '<div class="alert alert-danger">El usuario ingresado no existe.</div>';
          }
          this.boton_enabled = true;
          this.boton = 'Enviar';
        }
      );
    } else {
      this.boton = 'Enviar';
      this.boton_enabled = true;
      this.htmladd =
        '<div class="alert alert-danger">El usuario ingresado no existe.</div>';
    }
  }
}
