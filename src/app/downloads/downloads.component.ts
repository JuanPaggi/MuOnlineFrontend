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
    window.location.href = "https://drive.google.com/file/d/1vzlg88Alx031IOOA5fJOhOngJvdVhZEt/view";
  }

}
