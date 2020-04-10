import { Component, OnInit } from '@angular/core';
import { UsuarioDatosDto } from 'src/app/dto/dto_usuarios/UsuarioDatosDto';
import { User } from 'src/app/dto/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { UsuarioByIdDto } from 'src/app/dto/dto_usuarios/UsuarioByIdDto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user: User;
  Usuario: UsuarioDatosDto;
  change_pass_form: FormGroup;

  new_pass1: String;
  new_pass2: String;
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
    this.change_pass_form = new FormGroup({
      new_pass1: new FormControl(Validators.required),
      new_pass2: new FormControl(Validators.required),
      password: new FormControl(Validators.required),
    });
  }

  change_pass() {
    if (this.new_pass1 != this.new_pass2) {
      this.htmlAdd =
        '<div class="alert alert-danger">Las contrase&ntilde;as nos coinciden.</div>';
    } else {
      if (this.password != this.Usuario.clave) {
        this.htmlAdd =
          '<div class="alert alert-danger">Contrase&ntilde;a actual no es correcta.</div>';
      } else {
        //Llamada al back para cambiar pass
      }
    }
  }
}
