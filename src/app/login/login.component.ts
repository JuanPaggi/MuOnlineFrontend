import { Component, OnInit } from '@angular/core';
import { UsuarioLoginDto } from '../dto/dto_usuarios/UsuarioLoginDto';
import { UsersService } from '../services/users/users.service';
import { UsuarioDatosDto } from '../dto/dto_usuarios/UsuarioDatosDto';
import { UsuarioByIdDto } from '../dto/dto_usuarios/UsuarioByIdDto';
import { User } from '../dto/user.model';
import { Router } from '@angular/router';
import { UsuarioEditDto } from '../dto/dto_usuarios/UsuarioEditDto';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: String;
  clave: String;
  id_usuario: number;
  verification_code: String;

  Usuario: UsuarioDatosDto;

  htmlToAdd: String;
  htmlModal: String;

  user: User;

  constructor(private usuariosSrv: UsersService, private router: Router) {}

  ngOnInit() {
    this.user = this.usuariosSrv.getUserLoggedIn();
    if (this.user) {
      this.usuario = this.user.username;
    }
  }

  ComprobarUsuario() {
    let login = new UsuarioLoginDto();
    login.usuario = this.usuario;
    login.clave = this.clave;
    this.usuariosSrv.verify_user(login).subscribe(
      (response) => {
        if (response != 0) {
          this.id_usuario = response;
          this.usuariosSrv
            .get_user(new UsuarioByIdDto(this.id_usuario))
            .subscribe((response) => {
              this.Usuario = response;
              this.logIn(this.usuario, this.id_usuario, event);
              window.location.href = '/';
            });
        } else {
          this.htmlToAdd = '<p class="text-danger">Datos Incorrectos<p>';
        }
      },
      (err) => {
        switch (err.status) {
          case 300:
            $('#exampleModal').modal('toggle');
            break;
          case 401:
            this.htmlToAdd = '<p class="text-danger">Cuenta bloqueada.<p>';
            break;
          case 404:
            this.htmlModal = '<p class="text-danger">El usuario no existe.</p>';
          case 500:
            this.htmlModal = '<p class="text-danger">Error en el servidor.</p>';
        }
      }
    );
  }

  comprobar_activacion() {
    let verificar = new UsuarioEditDto();
    verificar.dato = this.usuario;
    verificar.dato2 = this.verification_code;
    this.usuariosSrv.is_verified(verificar).subscribe(
      (response) => {
        if (response) {
          this.ComprobarUsuario();
        } else {
          this.htmlModal =
            '<div class="alert alert-danger my-2">Codigo incorrecto.</div>';
        }
      },
      (err) => {
        switch (err.status) {
          case 404:
            this.htmlModal =
              '<div class="alert alert-danger">El usuario no existe.</div>';
          case 500:
            this.htmlModal =
              '<div class="alert alert-danger">Error en el servidor.</div>';
        }
      }
    );
  }

  logIn(username: String, id_usuario: number, event: Event) {
    event.preventDefault();
    let u: User = { username, id_usuario };
    this.usuariosSrv.setUserLoggedIn(u);
  }

  clickedSalir() {
    this.usuariosSrv.setUserLoggedOut();
    this.user = null;
    // window.location.reload();
    this.router.navigateByUrl('/');
  }
}
