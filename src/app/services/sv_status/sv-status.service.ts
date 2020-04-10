import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SvStatusService {
  constructor(private http: HttpClient) {}

  public server_status(): Observable<any> {
    let headers = {};
    return this.http.get(
      environment.apiEndpoint + '/estado/servidor1',
      headers
    );
  }
}
