import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioDatosDto } from 'src/app/dto/dto_usuarios/UsuarioDatosDto';
import { User } from 'src/app/dto/user.model';
import { UsuarioByIdDto } from 'src/app/dto/dto_usuarios/UsuarioByIdDto';
import { UsersService } from 'src/app/services/users/users.service';
import { UsuarioEditDto } from 'src/app/dto/dto_usuarios/UsuarioEditDto';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css'],
})
export class ChangeNameComponent implements OnInit {
  user: User;
  Usuario: UsuarioDatosDto;
  change_name_form: FormGroup;

  new_name: String;
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
    this.change_name_form = new FormGroup({
      new_name: new FormControl(Validators.required),
      password: new FormControl(Validators.required),
    });
  }

  change_name() {
    let dato = new UsuarioEditDto();
    dato.dato = this.new_name;
    dato.dato2 = this.password;
    this.usuariosSrv.edit_name(dato, this.Usuario.idUsuario).subscribe(
      (response) => {
        this.htmlAdd =
          '<div class="alert alert-success">Nombre cambiado correctamente.</div>';
      },
      (err) => {
        console.log(err);
        if (err.status == 403) {
          this.htmlAdd =
            '<div class="alert alert-danger">Contrase&ntilde;a incorrecta.</div>';
        }
      }
    );
  }
}
