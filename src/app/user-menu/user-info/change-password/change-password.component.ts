import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/dto/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { UsuarioEditDto } from 'src/app/dto/dto_usuarios/UsuarioEditDto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user: User;
  
  change_pass_form: FormGroup;

  new_pass1: String;
  new_pass2: String;
  password: String;
  htmlAdd: String;
  boton: String;
  public boton_enabled: boolean;

  constructor(private usuariosSrv: UsersService) {
    this.boton = 'Cambiar';
    this.boton_enabled = true;
  }

  ngOnInit(): void {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.change_pass_form = new FormGroup({
      new_pass1: new FormControl(Validators.required),
      new_pass2: new FormControl(Validators.required),
      password: new FormControl(Validators.required),
    });
  }

  change_pass() {
    this.boton_enabled = false;
    this.boton =
      '<span class="spinner-border spinner-border-sm mb-1"></span> Loading...';
    if (this.new_pass1 != this.new_pass2) {
      this.htmlAdd =
        '<div class="alert alert-danger">Las contrase&ntilde;as nos coinciden.</div>';
      this.boton = 'Cambiar';
      this.boton_enabled = true;
    } else {
      let dato = new UsuarioEditDto();
      dato.dato = this.password;
      dato.dato2 = this.new_pass1;
      this.usuariosSrv.edit_password(dato).subscribe(
        (response) => {
          this.htmlAdd =
            '<div class="alert alert-success">Contrase&ntilde;a cambiada correctamente.</div>';
          this.boton = 'Cambiar';
          this.boton_enabled = true;
        },
        (err) => {
          switch (err.status) {
            case 403:
              this.htmlAdd =
                '<div class="alert alert-danger">Contrase&ntilde;a incorrecta.</div>';
              break;
            case 500:
              this.htmlAdd =
                '<div class="alert alert-danger">Error en el servidor.</div>';
              this.usuariosSrv.setUserLoggedOut();
              break;
          }
          this.boton = 'Cambiar';
          this.boton_enabled = true;
        }
      );
    }
  }
}
