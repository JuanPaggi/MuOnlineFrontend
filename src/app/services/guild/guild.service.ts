import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs
import { GuildDatoDto } from 'src/app/dto/dto_guild/GuildDatoDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GuildService {
  constructor(private http: HttpClient) {}

  public get_guilds(body: GuildDatoDto): Observable<GuildDatoDto[]> {
    let headers = {};
    return this.http.get<GuildDatoDto[]>(
      environment.apiEndpoint + '/guild',
      headers
    );
  }
}
