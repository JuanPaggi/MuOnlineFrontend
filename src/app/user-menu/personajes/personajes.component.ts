import { Component, OnInit } from '@angular/core';
import { PersonajeDatosDto } from 'src/app/dto/dto_pj/PersonajeDatosDto';
import { UsersService } from 'src/app/services/users/users.service';
import { UsuarioByIdDto } from 'src/app/dto/dto_usuarios/UsuarioByIdDto';
import { User } from 'src/app/dto/user.model';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { UsuarioEditDto } from 'src/app/dto/dto_usuarios/UsuarioEditDto';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css'],
})
export class PersonajesComponent implements OnInit {
  user: User;
  personajes: PersonajeDatosDto[];

  htmlAdd: String;

  constructor(
    private usuariosSrv: UsersService,
    private personajesSrv: PersonajesService
  ) {
    this.personajes = [];
  }

  ngOnInit(): void {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.personajesSrv
      .get_character_by_user(new PersonajeDatosDto(), this.user.id_usuario)
      .subscribe((response) => {
        this.personajes = response;
      });
  }

  reset_points(pj: String) {
    let dato = new UsuarioEditDto();
    dato.dato = pj;
    this.personajesSrv.reset_points(dato, this.user.id_usuario).subscribe(
      (response) => {
        this.htmlAdd =
          '<div class="alert alert-success">Puntos reiniciados correctamente.</div>';
      },
      (err) => {
        if (err.status == 403) {
          this.htmlAdd =
            '<div class="alert alert-danger">Cierre la cuenta en el cliente y vuelva a intentarlo.</div>';
        }
      }
    );
  }
}
