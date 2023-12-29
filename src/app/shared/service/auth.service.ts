import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  basApi = '/api/Administrators/';

  constructor(private http: HttpClient) { }

  getByCredentials(adminname: string, password: string) {
    const headers = new HttpHeaders({
      'adminname': adminname,
      'adminpassword': password,
    });

    return this.http.get<any>(this.basApi, { headers });
  }

  isLoggedIn() {
    return sessionStorage.getItem('adminname') !== null;
  }
}
