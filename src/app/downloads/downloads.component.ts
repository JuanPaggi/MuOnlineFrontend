import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css'],
})
export class DownloadsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  linkDescarga(num: number) {
    switch (num) {
      case 0:
        window.open(
          'https://drive.google.com/open?id=1-Nl0xMoAu-s7H2CFmLYH26Qqw3J6x1GM',
          '_blank'
        );
        break;
      case 1:
        window.open(
          'https://mega.nz/file/3AdnRSDJ#eftc6cmVzSnOBn2Nafz75TPUxjoz3L0Hj13g5QTQ-1c',
          '_blank'
        );
        break;
      case 2:
        window.open(
          'https://www.mediafire.com/file/8rglb2l5ji8rssf/Mu_NewAge.rar/file',
          '_blank'
        );
        break;
    }
  }
}
