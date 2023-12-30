import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // getAll() {
  //   return this.http.get<any>("api/Administrators/");
  //   return this.http.get(this.basApi)
  // }

  //get record by single id 
  basApi = '/api/Administrators/';

  constructor(private http: HttpClient) { }

  getByCredentials(adminname: string, password: string) {
    const headers = new HttpHeaders({
      'adminname': adminname,
      'adminpassword': password,
    });

    // return this.http.get<any>(this.basApi, { headers });
    return this.http.post<any>(this.basApi, { headers });
  }

  isLoggedIn() {
    return sessionStorage.getItem('adminname') !== null;
  }

}
