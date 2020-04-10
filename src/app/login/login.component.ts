import { Component, OnInit } from '@angular/core';
import { UsuarioLoginDto } from '../dto/dto_usuarios/UsuarioLoginDto';
import { UsersService } from '../services/users/users.service';
import { UsuarioEditDto } from '../dto/dto_usuarios/UsuarioEditDto';
import { UsuarioDatosDto } from '../dto/dto_usuarios/UsuarioDatosDto';
import { UsuarioByIdDto } from '../dto/dto_usuarios/UsuarioByIdDto';
import { User } from '../dto/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: String;
  clave: String;
  id_usuario: number;

  Usuario: UsuarioDatosDto;

  htmlToAdd: String;

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
    this.usuariosSrv.verify_user(login).subscribe((response) => {
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
        this.htmlToAdd = '<p>Datos Incorrectos<p>';
      }
    });
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
