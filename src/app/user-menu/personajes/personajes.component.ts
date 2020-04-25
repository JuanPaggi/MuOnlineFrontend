import { Component, OnInit } from '@angular/core';
import { PersonajeDatosDto } from 'src/app/dto/dto_pj/PersonajeDatosDto';
import { UsersService } from 'src/app/services/users/users.service';
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

  password: String;

  option: String;

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
      .get_character_by_user()
      .subscribe((response) => {
        this.personajes = response;
      });
  }

  options_controller(pj: String) {

        switch (this.option) {
          case '0':
            this.reset_points(pj);
            break;
          case '1':
            this.move_character(pj);
            break;
          case '2':
            this.inventory_expand(pj);
            break;
          default:
            this.htmlAdd =
              '<div class="alert alert-danger">Seleccione una opcion correcta.</div>';
        }

  }


  reset_points(pj: String) {
    let dato = new UsuarioEditDto();
    dato.dato = pj;
    this.personajesSrv.reset_points(dato).subscribe(
      (response) => {
        this.htmlAdd =
          '<div class="alert alert-success">Puntos reiniciados correctamente.</div>';
      },
      (err) => {
        switch (err.status) {
          case 403:
            this.htmlAdd =
              '<div class="alert alert-danger">Cierre la cuenta en el cliente y vuelva a intentarlo.</div>';
          case 404:
            this.htmlAdd =
              '<div class="alert alert-danger">Contrase&ntilde;a incorrecta.</div>';
            break;
          case 500:
            this.htmlAdd =
              '<div class="alert alert-danger">Error en el servidor.</div>';
        }
      }
    );
  }

  move_character(pj: String) {
    let dato = new UsuarioEditDto();
    dato.dato = pj;
    this.personajesSrv.move_character(dato).subscribe(
      (response) => {
        this.htmlAdd =
          '<div class="alert alert-success">Personaje destrabado correctamente.</div>';
      },
      (err) => {
        switch (err.status) {
          case 403:
            this.htmlAdd =
              '<div class="alert alert-danger">Cierre la cuenta en el cliente y vuelva a intentarlo.</div>';
          case 404:
            this.htmlAdd =
              '<div class="alert alert-danger">Contrase&ntilde;a incorrecta.</div>';
            break;
          case 500:
            this.htmlAdd =
              '<div class="alert alert-danger">Error en el servidor.</div>';
        }
      }
    );
  }

  inventory_expand(pj: String) {
    let dato = new UsuarioEditDto();
    dato.dato = pj;
    this.personajesSrv.inventory_expand(dato).subscribe(
      (response) => {
        this.htmlAdd =
          '<div class="alert alert-success">Inventario expandido correctamente.</div>';
      },
      (err) => {
        switch (err.status) {
          case 401:
            this.htmlAdd =
              '<div class="alert alert-danger">El personaje debe tener al menos 10 reset para usar esta funcion.</div>';
            break;
          case 403:
            this.htmlAdd =
              '<div class="alert alert-danger">Cierre la cuenta en el cliente y vuelva a intentarlo.</div>';
          case 404:
            this.htmlAdd =
              '<div class="alert alert-danger">Contrase&ntilde;a incorrecta.</div>';
            break;
          case 500:
            this.htmlAdd =
              '<div class="alert alert-danger">Error en el servidor.</div>';
        }
      }
    );
  }

  warehouse_expand() {

        this.personajesSrv.warehouse_expand().subscribe(
          (response) => {
            this.htmlAdd =
              '<div class="alert alert-success">Baul expandido correctamente.</div>';
          },
          (err) => {
            switch (err.status) {
              case 403:
                this.htmlAdd =
                  '<div class="alert alert-danger">Cierre la cuenta en el cliente y vuelva a intentarlo.</div>';
              case 404:
                this.htmlAdd =
                  '<div class="alert alert-danger">Contrase&ntilde;a incorrecta.</div>';
                break;
              case 500:
                this.htmlAdd =
                  '<div class="alert alert-danger">Error en el servidor.</div>';
            }
          }
        );
      
  }
}
