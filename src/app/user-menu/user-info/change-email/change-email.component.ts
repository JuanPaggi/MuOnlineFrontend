import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/dto/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioByIdDto } from 'src/app/dto/dto_usuarios/UsuarioByIdDto';
import { UsuarioDatosDto } from 'src/app/dto/dto_usuarios/UsuarioDatosDto';
import { UsuarioEditDto } from 'src/app/dto/dto_usuarios/UsuarioEditDto';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css'],
})
export class ChangeEmailComponent implements OnInit {
  user: User;
  Usuario: UsuarioDatosDto;
  change_email_form: FormGroup;

  new_email: String;
  password: String;

  htmlAdd: String;

  constructor(private usuariosSrv: UsersService) {
    this.Usuario = new UsuarioDatosDto();
  }

  ngOnInit(): void {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.usuariosSrv
      .get_user(new UsuarioByIdDto(this.user.id_usuario))
      .subscribe((response) => {
        this.Usuario = response;
      });
    this.change_email_form = new FormGroup({
      new_email: new FormControl(Validators.required),
      password: new FormControl(Validators.required),
    });
  }

  change_email() {
    let dato = new UsuarioEditDto();
    dato.dato = this.new_email;
    dato.dato2 = this.password;
    this.usuariosSrv.edit_email(dato, this.Usuario.idUsuario).subscribe(
      (response) => {
        this.htmlAdd =
          '<div class="alert alert-success">Email cambiado correctamente.</div>';
      },
      (err) => {
        if (err.status == 403) {
          this.htmlAdd =
            '<div class="alert alert-danger">Contrase&ntilde;a incorrecta.</div>';
        }
      }
    );
  }
}