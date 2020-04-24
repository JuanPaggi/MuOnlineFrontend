import { Component, OnInit } from '@angular/core';
import { UsuarioLoginDto } from '../dto/dto_usuarios/UsuarioLoginDto';
import { UsersService } from '../services/users/users.service';
import { UsuarioDatosDto } from '../dto/dto_usuarios/UsuarioDatosDto';
import { User } from '../dto/user.model';
import { Router } from '@angular/router';
import { UsuarioEditDto } from '../dto/dto_usuarios/UsuarioEditDto';
import { SvStatusService } from '../services/sv_status/sv-status.service';

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

  boton: String;
  boton_enabled: boolean;
  btnmodal: String;
  btnmodal_enabled: boolean;

  constructor(private usuariosSrv: UsersService, private router: Router) {
    this.boton = 'Entrar';
    this.boton_enabled = true;
    this.btnmodal = 'Enviar';
    this.btnmodal_enabled = true;
  }

  ngOnInit() {    
    this.user = this.usuariosSrv.getUserLoggedIn();
    if (this.user) {
      this.usuario = this.user.username;
    }
  }

  ComprobarUsuario() {
    this.boton =
      '<span class="spinner-border spinner-border-sm mb-1"></span> Loading...';
    this.boton_enabled = false;
    let login = new UsuarioLoginDto();
    login.usuario = this.usuario;
    login.clave = this.clave;
    this.usuariosSrv.verify_user(login).subscribe(
      (response) => {
        if (response != 0) {
          this.id_usuario = response;
          this.usuariosSrv
            .get_user()
            .subscribe((response) => {
              this.Usuario = response;
              this.logIn(this.usuario, this.id_usuario, this.Usuario.email, this.Usuario.nombre, this.Usuario.creditos, this.Usuario.baulExtra, event);
              window.location.href = '/';
            });
        } else {
          this.boton = 'Entrar';
          this.boton_enabled = true;
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
          case 403:
            this.htmlToAdd = '<p class="text-danger">Servidor offline.<p>';
            break;
          case 404:
            this.htmlModal = '<p class="text-danger">El usuario no existe.</p>';
            break;
          case 500:
            this.htmlModal = '<p class="text-danger">Error en el servidor.</p>';
        }
        this.boton = 'Entrar';
        this.boton_enabled = true;
      }
    );
  }

  comprobar_activacion() {
    this.btnmodal =
      '<span class="spinner-border spinner-border-sm mb-1"></span> Loading...';
    this.btnmodal_enabled = false;
    let verificar = new UsuarioEditDto();
    verificar.dato = this.usuario;
    verificar.dato2 = this.verification_code;
    this.usuariosSrv.is_verified(verificar).subscribe(
      (response) => {
        if (response) {
          this.ComprobarUsuario();
        } else {
          this.btnmodal = 'Enviar';
          this.btnmodal_enabled = true;
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
        this.btnmodal = 'Enviar';
        this.btnmodal_enabled = true;
      }
    );
  }

  logIn(username: String, id_usuario: number, email:String, nombre:String, creditos:number, baulExtra:boolean, event: Event) {
    event.preventDefault();
    let u: User = { username, id_usuario, email, nombre, creditos, baulExtra };
    this.usuariosSrv.setUserLoggedIn(u);
  }

  clickedSalir() {
    this.usuariosSrv.setUserLoggedOut();
    this.user = null;
    // window.location.reload();
    this.router.navigateByUrl('/');
  }
}
