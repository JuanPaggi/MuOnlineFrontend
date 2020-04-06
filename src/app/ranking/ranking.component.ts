import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

    ranking = [
      {
        rank: '1',
        nombre: 'pedro',
        clase: 'dw',
        nivel: '400',
        reset: '1',
        pais: 'argentina',
       },

       {
        rank: '2',
        nombre: 'jorge',
        clase: 'dk',
        nivel: '399',
        reset: '0',
        pais: 'argentina',
       },
       {
        rank: '3',
        nombre: 'jkkkkk',
        clase: 'dk',
        nivel: '399',
        reset: '0',
        pais: 'argentina',
       },
       {
        rank: '4',
        nombre: 'asdas',
        clase: 'dk',
        nivel: '399',
        reset: '0',
        pais: 'argentina',
       },
       {
        rank: '5',
        nombre: 'jfasdf',
        clase: 'elf',
        nivel: '399',
        reset: '0',
        pais: 'argentina',
       },

    ];


  constructor() { }

  ngOnInit(): void {
  }

}
