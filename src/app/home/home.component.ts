import { Component, OnInit } from '@angular/core';
import { PersonajeDatosDto } from '../dto/dto_pj/PersonajeDatosDto';
import { PersonajesService } from '../services/personajes/personajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ranking: PersonajeDatosDto[];

  constructor(private pj_service: PersonajesService) {}

  ngOnInit(): void {
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
        console.log(this.ranking);
      });
  }
}
