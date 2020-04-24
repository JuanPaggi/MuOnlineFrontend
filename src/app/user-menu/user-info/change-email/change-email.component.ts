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

  htmlAdd: String;
  boton: String;
  public boton_enabled: boolean;

  constructor(private usuariosSrv: UsersService) {
    this.Usuario = new UsuarioDatosDto();
    this.boton = 'Cambiar';
    this.boton_enabled = true;
  }

  ngOnInit(): void {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.usuariosSrv
      .get_user()
      .subscribe((response) => {
        this.Usuario = response;
      });
    this.change_email_form = new FormGroup({
      new_email: new FormControl(Validators.required),
      password: new FormControl(Validators.required),
    });
  }

  change_email() {
    this.boton_enabled = false;
    this.boton =
      '<span class="spinner-border spinner-border-sm mb-1"></span> Loading...';
    let dato = new UsuarioEditDto();
    dato.dato = this.new_email;
    this.usuariosSrv.edit_email(dato).subscribe(
      (response) => {
        this.htmlAdd =
          '<div class="alert alert-success">Email cambiado correctamente.</div>';
        this.boton = 'Cambiar';
        this.boton_enabled = true;
      },
      (err) => {
        switch (err.status) {
          case 403:
            this.htmlAdd =
              '<div class="alert alert-danger">Contrase&ntilde;a incorrecta.</div>';
          case 500:
            this.htmlAdd =
              '<div class="alert alert-danger">Error en el servidor.</div>';
        }
        this.boton = 'Cambiar';
        this.boton_enabled = true;
      }
    );
  }
}
