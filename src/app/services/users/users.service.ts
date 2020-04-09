import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// DTOs
import { CreateUser } from 'src/app/dto/dto_usuarios/CreateUser';
import { UsuarioDatosDto } from 'src/app/dto/dto_usuarios/UsuarioDatosDto';
import { UsuarioEditDto } from 'src/app/dto/UsuarioEditDto';
import { UsuarioLoginDto } from 'src/app/dto/dto_usuarios/UsuarioLoginDto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public add_user(body: CreateUser): Observable<Response> {
    return this.http.post<Response>(
      environment.apiEndpoint + '/usuarios',
      body
    );
  }

  public get_user(body: UsuarioDatosDto): Observable<Response> {
    let headers = {};
    return this.http.get<Response>(
      environment.apiEndpoint + '/usuarios/' + body.idUsuario,
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
    id_user: String
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
    id_user: String
  ): Observable<Response> {
    let headers = {};
    return this.http.put<Response>(
      environment.apiEndpoint + '/usuarios/email/' + id_user,
      body,
      headers
    );
  }
}
