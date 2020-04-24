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

  private headers = {withCredentials: true};

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  public add_user(body: CreateUser): Observable<Response> {
    return this.http.post<Response>(
      environment.apiEndpoint + '/usuarios',
      body
    );
  }

  public get_user(): Observable<UsuarioDatosDto> {
    return this.http.get<UsuarioDatosDto>(
      environment.apiEndpoint + '/usuarios',
      this.headers
    );
  }

  public verify_user(body: UsuarioLoginDto): Observable<number> {
    return this.http.post<number>(
      environment.apiEndpoint + '/usuarios/login',
      body,
      this.headers
    );
  }

  public is_verified(body: UsuarioEditDto): Observable<Response> {
    let headers = {};
    return this.http.post<Response>(
      environment.apiEndpoint + 'usuarios/login/verificarCodigo',
      body,
      headers
    );
  }

  public edit_name(
    body: UsuarioEditDto
  ): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/usuarios/nombre',
      body,
      this.headers
    );
  }

  public edit_email(
    body: UsuarioEditDto
  ): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/usuarios/email',
      body,
      this.headers
    );
  }

  public edit_password(
    body: UsuarioEditDto
  ): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/usuarios/clave',
      body,
      this.headers
    );
  }

  public users_online(): Observable<any> {
    let headers = {};
    return this.http.get(
      environment.apiEndpoint + '/estado/jugadores',
      headers
    );
  }

  public reset_pass(user: String, code: String): Observable<Response> {
    let headers = {};
    return this.http.post<Response>(
      environment.apiEndpoint + '/usuarios/activarClave/' + user + '/' + code,
      headers
    );
  }

  public forgot_password(body: UsuarioEditDto): Observable<Response> {
    let headers = {};
    return this.http.post<Response>(
      environment.apiEndpoint + '/usuarios/recuperarClave',
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
