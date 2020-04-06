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
        class: 'dw',
        level: '400',
        reset: '1',
        pais: 'argentina',
       },

       {
        rank: '2',
        nombre: 'jorge',
        class: 'dk',
        level: '399',
        reset: '0',
        pais: 'argentina',
       },
       {
        rank: '3',
        nombre: 'jkkkkk',
        class: 'dk',
        level: '399',
        reset: '0',
        pais: 'argentina',
       },
       {
        rank: '4',
        nombre: 'asdas',
        class: 'dk',
        level: '399',
        reset: '0',
        pais: 'argentina',
       },
       {
        rank: '5',
        nombre: 'jfasdf',
        class: 'elf',
        level: '399',
        reset: '0',
        pais: 'argentina',
       },

    ];


  constructor() { }

  ngOnInit(): void {
  }

}
