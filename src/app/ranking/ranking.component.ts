import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../services/personajes/personajes.service';
import { PersonajeDatosDto } from '../dto/dto_pj/PersonajeDatosDto';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  ranking: PersonajeDatosDto[];
  ranking_show: PersonajeDatosDto[];
  ranking_fil: PersonajeDatosDto[];

  constructor(private pj_service: PersonajesService) {
    this.ranking_show = [];
  }

  ngOnInit(): void {
    this.load_ranking();
  }

  private load_ranking() {
    this.pj_service
      .get_character(new PersonajeDatosDto())
      .subscribe((response) => {
        this.ranking = response;
        this.ranking_show = this.ranking;
      });
  }

  public filtrar_clase(cl: number) {
    this.ranking_fil = [];
    for (let i = 0; i < this.ranking.length; i++) {
      if (this.ranking[i].clase == cl) {
        this.ranking_fil.push(this.ranking[i]);
      }
    }
    this.ranking_show = this.ranking_fil;
  }

  public reset_filter() {
    this.ranking_show = this.ranking;
  }
}
