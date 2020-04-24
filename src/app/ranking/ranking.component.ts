import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../services/personajes/personajes.service';
import { PersonajeDatosDto } from '../dto/dto_pj/PersonajeDatosDto';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  private ranking: PersonajeDatosDto[];
  private ranking_fil: PersonajeDatosDto[];

  public ranking_show: PersonajeDatosDto[];

  public btn_siguiente: boolean;
  public btn_anterior: boolean;
  public btn_filter: boolean;

  public pagina: number;

  public htmladd: String;

  constructor(private pj_service: PersonajesService) {
    this.ranking_show = [];
    this.ranking_fil = [];
  }

  ngOnInit(): void {
    this.pagina = 0;
    this.load_ranking();
  }

  private load_ranking() {
    this.pj_service.get_character().subscribe(
      (response) => {
        this.ranking = response;
        this.reset_ranking();
      },
      (err) => {
        switch (err.status) {
          case 500:
            this.htmladd =
              '<div class="alert alert-danger">Error en el servidor.</div>';
        }
      }
    );
  }

  private reset_ranking() {
    this.ranking_fil = this.ranking;
    this.btn_filter = false;
    this.pagina = 0;
    this.ordenar_pagina();
  }

  private ordenar_pagina() {
    if (this.ranking_fil.length < 21) {
      this.mostrar_ranking(0, 20);
      this.control_botones(0); //NO BUTTONS
    } else {
      switch (this.pagina) {
        case 0:
          this.mostrar_ranking(0, 20);
          if (this.ranking_fil.length > 20) {
            this.control_botones(1); // ONLY NEXT BUTTON
          } else {
            this.control_botones(0); // NO BUTTONS
          }
          break;
        case 1:
          this.mostrar_ranking(20, 40);
          if (this.ranking_fil.length > 20 && this.ranking_fil.length < 41) {
            this.control_botones(2); // ONLY BACK BUTTON
          } else {
            this.control_botones(3); // ALL BUTTONS
          }
          break;

        case 2:
          this.mostrar_ranking(40, 60);
          if (this.ranking_fil.length > 40 && this.ranking_fil.length < 61) {
            this.control_botones(2); // ONLY BACK BUTTON
          } else {
            this.control_botones(3); // ALL BUTTONS
          }
          break;

        case 3:
          this.mostrar_ranking(60, 80);
          if (this.ranking_fil.length > 60 && this.ranking_fil.length < 81) {
            this.control_botones(2); // ONLY BACK BUTTON
          } else {
            this.control_botones(3); // ALL BUTTONS
          }
          break;

        case 4:
          this.mostrar_ranking(80, 100);
          if (this.ranking_fil.length > 80) {
            this.control_botones(2);
          }
          break;
      }
    }
  }

  private control_botones(accion: number) {
    switch (accion) {
      case 0: // NO BUTTONS
        this.btn_anterior = false;
        this.btn_siguiente = false;
        break;
      case 1: // ONLY NEXT
        this.btn_anterior = false;
        this.btn_siguiente = true;
        break;
      case 2: // ONLY BACK
        this.btn_anterior = true;
        this.btn_siguiente = false;
        break;
      case 3: // ALL BUTTONS
        this.btn_anterior = true;
        this.btn_siguiente = true;
        break;
    }
  }

  private mostrar_ranking(inicio: number, fin: number) {
    this.ranking_show = [];
    for (let i = inicio; i < fin; i++) {
      if (this.ranking_fil[i]) {
        this.ranking_show.push(this.ranking_fil[i]);
      } else {
        break;
      }
    }
  }

  public filtrar_clase(cl: number) {
    this.ranking_fil = [];
    for (let i = 0; i < this.ranking.length; i++) {
      if (
        this.ranking[i].clase == cl ||
        this.ranking[i].clase == cl + 1 ||
        this.ranking[i].clase == cl + 2
      ) {
        this.ranking_fil.push(this.ranking[i]);
      }
    }
    this.btn_filter = true;
    this.pagina = 0;
    this.ordenar_pagina();
  }

  public next_page() {
    if (this.pagina < 5) {
      this.pagina += 1;
      this.ordenar_pagina();
    }
  }

  public back_page() {
    if (this.pagina > 0) {
      this.pagina -= 1;
      this.ordenar_pagina();
    }
  }

  public reset_filter() {
    this.reset_ranking();
  }
}
