import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/dto/user.model';
import { UsuarioDatosDto } from 'src/app/dto/dto_usuarios/UsuarioDatosDto';
import { UsuarioByIdDto } from 'src/app/dto/dto_usuarios/UsuarioByIdDto';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  Usuario: UsuarioDatosDto;
  user: User;

  constructor(private usuariosSrv: UsersService) {
    this.Usuario = new UsuarioDatosDto();
  }

  ngOnInit(): void {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.usuariosSrv
      .get_user(new UsuarioByIdDto(this.user.id_usuario))
      .subscribe(
        (response) => {
          this.Usuario = response;
        },
        (err) => {
          switch (err.status) {
            case 404: //user does not exist
              console.log('Usuario no existe');
              break;
            case 500: //default error
              console.log('Server error 500');
              break;
          }
        }
      );
  }
}
