import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// DTOs
import { PersonajeDatosDto } from 'src/app/dto/dto_pj/PersonajeDatosDto';
import { UsuarioEditDto } from 'src/app/dto/dto_usuarios/UsuarioEditDto';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  constructor(private http: HttpClient) {}

  public get_character(
    body: PersonajeDatosDto
  ): Observable<PersonajeDatosDto[]> {
    let headers = {};
    return this.http.get<PersonajeDatosDto[]>(
      environment.apiEndpoint + '/personajes',
      headers
    );
  }

  public get_character_by_user(
    body: PersonajeDatosDto,
    uid: number
  ): Observable<PersonajeDatosDto[]> {
    let headers = {};
    return this.http.get<PersonajeDatosDto[]>(
      environment.apiEndpoint + '/personajes/' + uid,
      headers
    );
  }

  public reset_points(body: UsuarioEditDto, uid: number): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/personajes/reiniciarPuntos/' + uid,
      body
    );
  }

  public buy_boxes(body: UsuarioEditDto, uid: number): Observable<Response> {
    let headers = {};
    return this.http.put<Response>(
      environment.apiEndpoint + '/personajes/tienda/' + uid,
      body,
      headers
    );
  }
}
