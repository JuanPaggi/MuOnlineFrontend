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

  private headers = { withCredentials: true };
  
  constructor(private http: HttpClient) { 
  }

  public get_character(): Observable<PersonajeDatosDto[]> {
    return this.http.get<PersonajeDatosDto[]>(
      environment.apiEndpoint + '/personajes',
      this.headers
    );
  }

  public get_character_by_user(): Observable<PersonajeDatosDto[]> {
    return this.http.get<PersonajeDatosDto[]>(
      environment.apiEndpoint + '/personajes/personajesUsuario',
      this.headers
    );
  }

  public reset_points(body: UsuarioEditDto): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/personajes/reiniciarPuntos',
      body,
      this.headers
    );
  }


  public move_character(body: UsuarioEditDto): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/personajes/destrabarPersonaje',
      body,
      this.headers
    );
  }

  public warehouse_expand(): Observable<Response> {
    let body = {};
    return this.http.put<Response>(
      environment.apiEndpoint + '/personajes/expandirBaul',
      body,
      this.headers
    );
  }

  public inventory_expand(body: UsuarioEditDto): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/personajes/expandirInventario',
      body,
      this.headers
    );
  }

  public buy_boxes(body: UsuarioEditDto): Observable<Response> {
    return this.http.put<Response>(
      environment.apiEndpoint + '/personajes/tienda',
      body,
      this.headers
    );
  }


}
