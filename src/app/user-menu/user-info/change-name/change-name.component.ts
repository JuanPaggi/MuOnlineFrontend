import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/dto/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { UsuarioEditDto } from 'src/app/dto/dto_usuarios/UsuarioEditDto';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css'],
})
export class ChangeNameComponent implements OnInit {
  user: User;
  
  change_name_form: FormGroup;

  new_name: String;

  htmlAdd: String;
  boton: String;
  public boton_enabled: boolean;

  constructor(private usuariosSrv: UsersService) {
    this.boton_enabled = true;
  }

  ngOnInit(): void {
    this.boton = 'Cambiar';
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.change_name_form = new FormGroup({
      new_name: new FormControl(Validators.required),
      password: new FormControl(Validators.required),
    });
  }

  change_name() {
    this.boton_enabled = false;
    this.boton =
      '<span class="spinner-border spinner-border-sm mb-1"></span> Loading...';
    let dato = new UsuarioEditDto();
    dato.dato = this.new_name;
    this.usuariosSrv.edit_name(dato).subscribe(
      (response) => {
        this.user.nombre = this.new_name;
        this.usuariosSrv.setUserLoggedIn(this.user);
        this.boton = 'Cambiar';
        this.boton_enabled = true;
        this.htmlAdd =
          '<div class="alert alert-success">Nombre cambiado correctamente.</div>';
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
        this.boton_enabled = true;
        this.boton = 'Cambiar';
      }
    );
  }
}
