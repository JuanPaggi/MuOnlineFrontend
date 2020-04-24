import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/dto/user.model';
import { UsuarioDatosDto } from 'src/app/dto/dto_usuarios/UsuarioDatosDto';

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
  }
}
