import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  linkDescarga(){
    window.location.href = "https://drive.google.com/open?id=1TPwo9zrhbQKPYeh2Vn6AdO4rdvO9TlSy";
  }

}
