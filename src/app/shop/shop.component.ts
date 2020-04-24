import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { PersonajesService } from '../services/personajes/personajes.service';
import { User } from '../dto/user.model';
import { UsuarioEditDto } from '../dto/dto_usuarios/UsuarioEditDto';
import { UsuarioDatosDto } from '../dto/dto_usuarios/UsuarioDatosDto';
import { UsuarioByIdDto } from '../dto/dto_usuarios/UsuarioByIdDto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  public user: User;
  public creditos: number;
  public logged: boolean;
  public cantidad: String;
  public htmladd: String;
  public boton: String;
  public boton_enabled: boolean;
  public cost: number;

  constructor(
    private userSrv: UsersService,
    private characterSrv: PersonajesService
  ) {
    this.logged = false;
    this.boton = 'Comprar';
    this.boton_enabled = false;
    this.cantidad = '0';
  }

  ngOnInit(): void {
    this.user = this.userSrv.getUserLoggedIn();
    if (this.user) {
      this.creditos = this.user.creditos;
      this.logged = true;
    }else{
      this.creditos = 0;
    }
    this.actualizar_precio();
  }

  public actualizar_precio() {
    if (this.cantidad) {
      let cant: string;
      cant = this.cantidad.toString();
      this.cost = parseInt(cant) * 30;
    } else {
      this.cost = 0;
    }
    if (this.cost > this.creditos || this.cost == 0) {
      this.boton_enabled = false;
    } else {
      this.boton_enabled = true;
    }
  }

  public buy_boxes() {
    this.boton_enabled = false;
    this.boton =
      '<span class="spinner-border spinner-border-sm mb-1"></span> Loading...';
    this.htmladd = '';
    if (this.cantidad != '0') {
      let dato = new UsuarioEditDto();
      dato.dato = this.cantidad;
      this.characterSrv.buy_boxes(dato, this.user.id_usuario).subscribe(
        (response) => {
          this.boton = 'Comprar';
          this.boton_enabled = true;
          this.creditos -= this.cost;
          this.user.creditos = this.creditos;
          this.userSrv.setUserLoggedIn(this.user);
          this.htmladd =
            '<div class="alert alert-success">La compra fue realizada correctamente.</div>';
        },
        (err) => {
          switch (err.status) {
            case 401:
              this.htmladd =
                '<div class="alert alert-danger">El usuario se encuentra conectado.</div>';
              break;
            case 403: //vault full
              this.htmladd =
                '<div class="alert alert-danger">No hay espacio en el baul.</div>';
              break;
            case 404: //user does not exist
              this.htmladd =
                '<div class="alert alert-danger">El usuario no existe.</div>';
              break;

            case 500: //general
              this.htmladd =
                '<div class="alert alert-danger">Ocurrio un error inesperado, intente de nuevo mas tarde.</div>';
              break;
          }
          this.boton = 'Comprar';
          this.boton_enabled = true;
        }
      );
    } else {
      this.htmladd =
        '<div class="alert alert-danger">Cantidad ingresada incorrecta.</div>';
      this.boton = 'Comprar';
      this.boton_enabled = true;
    }
  }
}
