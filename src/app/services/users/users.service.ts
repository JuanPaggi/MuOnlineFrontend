import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// DTOs
import { CreateUser } from 'src/app/dto/dto_usuarios/CreateUser';
import { UsuarioDatosDto } from 'src/app/dto/dto_usuarios/UsuarioDatosDto';
import { UsuarioEditDto } from 'src/app/dto/dto_usuarios/UsuarioEditDto';
import { UsuarioLoginDto } from 'src/app/dto/dto_usuarios/UsuarioLoginDto';
import { User } from 'src/app/dto/user.model';
import { UsuarioByIdDto } from 'src/app/dto/dto_usuarios/UsuarioByIdDto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private isUserLoggedIn: boolean;
  public usserLogged: User;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  public add_user(body: CreateUser): Observable<Response> {
    return this.http.post<Response>(
      environment.apiEndpoint + '/usuarios',
      body
    );
  }

  public get_user(body: UsuarioByIdDto): Observable<UsuarioDatosDto> {
    let headers = {};
    return this.http.get<UsuarioDatosDto>(
      environment.apiEndpoint + '/usuarios/' + body.id_usuario,
      headers
    );
  }

  public verify_user(body: UsuarioLoginDto): Observable<number> {
    return this.http.post<number>(
      environment.apiEndpoint + '/usuarios/login',
      body
    );
  }

  public edit_name(
    body: UsuarioEditDto,
    id_user: number
  ): Observable<Response> {
    let headers = {};
    return this.http.put<Response>(
      environment.apiEndpoint + '/usuarios/nombre/' + id_user,
      body,
      headers
    );
  }

  public edit_email(
    body: UsuarioEditDto,
    id_user: number
  ): Observable<Response> {
    let headers = {};
    return this.http.put<Response>(
      environment.apiEndpoint + '/usuarios/email/' + id_user,
      body,
      headers
    );
  }

  public edit_password(
    body: UsuarioEditDto,
    uid: number
  ): Observable<Response> {
    let headers = {};
    return this.http.put<Response>(
      environment.apiEndpoint + '/usuarios/clave/' + uid,
      body,
      headers
    );
  }

  setUserLoggedIn(user: User) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  setUserLoggedOut() {
    this.isUserLoggedIn = false;
    this.usserLogged = null;
    localStorage.setItem('currentUser', JSON.stringify(null));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
