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
          'https://drive.google.com/open?id=1TPwo9zrhbQKPYeh2Vn6AdO4rdvO9TlSy',
          '_blank'
        );
        break;
      case 1:
        window.open(
          'https://mega.nz/file/OYsGAKob#bWiuoG1mwHE7o3GVltReTZq5q76E6ELUQoXeCxPSF34',
          '_blank'
        );
        break;
      case 2:
        window.open(
          'https://www.mediafire.com/file/s4h6505o75bqki5/Mu_NewAge.rar/file',
          '_blank'
        );
        break;
    }
  }
}
