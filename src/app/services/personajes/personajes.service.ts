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

  public get_character(body: PersonajeDatosDto): Observable<Response> {
    let headers = {};
    return this.http.get<Response>(
      environment.apiEndpoint + '/personajes/' + body.personaje,
      headers
    );
  }

  public reset_points(body: UsuarioEditDto, uid: number): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/personajes/reiniciarPuntos/' + uid,
      body
    );
  }
}
