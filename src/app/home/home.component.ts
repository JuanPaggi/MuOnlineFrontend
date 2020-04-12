import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../services/personajes/personajes.service';
import { User } from '../dto/user.model';
import { UsersService } from '../services/users/users.service';
import { SvStatusService } from '../services/sv_status/sv-status.service';
import { PersonajeDatosDto } from '../dto/dto_pj/PersonajeDatosDto';
import { GuildDatoDto } from '../dto/dto_guild/GuildDatoDto';
import { GuildService } from '../services/guild/guild.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ranking: PersonajeDatosDto[];

  ranking_guild: GuildDatoDto[];

  user: User;

  onlineUs: number;

  online: boolean;

  constructor(
    private pj_service: PersonajesService,
    private usuariosSrv: UsersService,
    private server: SvStatusService,
    private guildSrv: GuildService
  ) {}

  ngOnInit(): void {
    this.user = this.usuariosSrv.getUserLoggedIn();
    this.load_ranking();
    this.load_ranking_guild();
    this.usuariosSrv.users_online().subscribe((response) => {
      this.onlineUs = response;
    });
    this.server.server_status().subscribe((response) => {
      this.online = response;
    });
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

  private load_ranking_guild() {
    this.guildSrv.get_guilds(new GuildDatoDto()).subscribe((response) => {
      this.ranking_guild = response;
    });
  }
}
