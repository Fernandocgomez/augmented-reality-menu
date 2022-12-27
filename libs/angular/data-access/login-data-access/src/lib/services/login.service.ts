import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  access_token: string;
  restaurantOwner: {
    id: string;
    username: string;
  };
}

@Injectable()
export class LoginService {

  xreatsBackendEndPoint = 'http://localhost:3333/api/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${this.xreatsBackendEndPoint}auth/login`, { username, password });
  }
}
