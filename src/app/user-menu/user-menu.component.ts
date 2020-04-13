import { Component, OnInit } from '@angular/core';
import { User } from '../dto/user.model';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit {
  user: User;

  usuario: String;

  logged: boolean;

  constructor(private usuariosSrv: UsersService) {
    this.logged = false;
  }

  ngOnInit(): void {
    this.user = this.usuariosSrv.getUserLoggedIn();
    if (this.user) {
      this.usuario = this.user.username;
      this.logged = true;
    }
  }
}
