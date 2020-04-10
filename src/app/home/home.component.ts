import { Component, OnInit } from '@angular/core';
import { PersonajeDatosDto } from '../dto/dto_pj/PersonajeDatosDto';
import { PersonajesService } from '../services/personajes/personajes.service';
import { User } from '../dto/user.model';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ranking: PersonajeDatosDto[];

  user: User;

  constructor(
    private pj_service: PersonajesService,
    private usuariosSrv: UsersService
  ) {}

  ngOnInit(): void {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.load_ranking();
  }

  private load_ranking() {
    this.pj_service
      .get_character(new PersonajeDatosDto())
      .subscribe((response) => {
        this.ranking = response;
        while (this.ranking.length > 10) {
          this.ranking.pop();
        }
      });
  }
}
