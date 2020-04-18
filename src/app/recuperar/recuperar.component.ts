import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css'],
})
export class RecuperarComponent implements OnInit {
  public user: String;
  public code: String;

  public htmladd: String;

  constructor(private route: ActivatedRoute, private usersSrv: UsersService) {
    this.user = this.route.snapshot.paramMap.get('user');
    this.code = this.route.snapshot.paramMap.get('code');
  }

  ngOnInit(): void {
    console.log(this.user + ': ' + this.code);
    this.usersSrv.reset_pass(this.user, this.code).subscribe(
      (response) => {
        this.htmladd =
          '<div class="alert alert-success">Password reiniciado correctamente.</div>';
      },
      (err) => {
        switch (err.status) {
          case 404:
            this.htmladd =
              '<div class="alert alert-danger">El usuario no existe.</div>';
          case 500:
            '<div class="alert alert-danger">Ocurrio un error inesperado, vuelva a intentarlo en unos momentos.</div>';
        }
      }
    );
  }
}
