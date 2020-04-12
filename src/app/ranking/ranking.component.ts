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

  public btn_siguiente: boolean;
  public btn_anterior: boolean;
  public show_btn: number;

  public pagina: number;

  constructor(private pj_service: PersonajesService) {
    this.ranking_show = [];
  }

  ngOnInit(): void {
    this.pagina = 0;
    this.load_ranking();
  }

  private load_ranking() {
    this.pj_service
      .get_character(new PersonajeDatosDto())
      .subscribe((response) => {
        this.ranking = response;
        this.filtrar_pagina(0);
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

  private button_control(num: number) {
    switch (num) {
      case 0:
        this.btn_anterior = false;
        this.btn_siguiente = true;
        break;
      case 1:
        this.btn_anterior = true;
        this.btn_siguiente = false;
        break;
      case 2:
        this.btn_anterior = true;
        this.btn_siguiente = true;
    }
  }

  private paginado(inicio: number, fin: number) {
    this.ranking_fil = [];
    for (let i = inicio; i < fin; i++) {
      if (this.ranking[i]) {
        this.ranking_fil.push(this.ranking[i]);
      } else {
        this.show_btn = 1;
        break;
      }
    }
    this.ranking_show = this.ranking_fil;
  }

  public filtrar_pagina(boton: number) {
    switch (boton) {
      case 0:
        this.pagina = 0;
        this.show_btn = 0;
        break;
      case 1:
        if (this.pagina >= 20) {
          this.pagina -= 20;
        }
        this.show_btn = 0;
        break;
      case 2:
        if (this.pagina <= 80) {
          this.pagina += 20;
        }
        this.show_btn = 1;
        break;
    }
    if (this.pagina != 0 && this.pagina != 80) {
      this.show_btn = 2;
    }
    this.paginado(this.pagina, this.pagina + 20);
    this.button_control(this.show_btn);
  }

  public reset_filter() {
    this.filtrar_pagina(0);
  }
}
