import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestaurantOwnerLoginInterface } from '@xreats/shared-models';

@Injectable()
export class LoginService {

  private xreatsBackendEndPoint = 'http://localhost:3333/api/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<RestaurantOwnerLoginInterface> {
    return this.http.post<RestaurantOwnerLoginInterface>(`${this.xreatsBackendEndPoint}auth/login`, { username, password });
  }
}
