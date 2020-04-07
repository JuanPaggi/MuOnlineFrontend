import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/app/dto/dto_create/CreateUser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
}
