import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = '/api/Administrators/';

  constructor(private http: HttpClient) { }

  encryptPassword(password: string): string {
    const encrypted = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return encrypted;
  }
  login(adminname: string, adminpassword: string): Observable<any> {
    const loginUrl = `${this.baseUrl}`;
    const encryptedPassword = this.encryptPassword(adminpassword);
    const params = { adminname, adminpassword: encryptedPassword };
    return this.http.get<any>(loginUrl, { params });
  }

  logout(): void {
    localStorage.removeItem('admin');
  }



  // getByCredentials(adminname: string, password: string) {
  //   const headers = new HttpHeaders({
  //     'adminname': adminname,
  //     'adminpassword': password,
  //   });

  //   return this.http.get<any>(this.basApi, { headers });
  // }

  isLoggedIn() {
    return sessionStorage.getItem('adminname') !== null;
  }

  // login(adminname: string, adminpassword: string): Observable<any> {
  //   const loginUrl = `/api/Administrators/`; // Replace with your actual login endpoint
  //   const params = { adminname, adminpassword };

  //   // Use 'params' to send the credentials in the URL
  //   return this.http.get<changePassword>(loginUrl, { params });
  // }

  // logout(): void {
  //   // Clear user data from local storage on logout
  //   localStorage.removeItem('admin');
  // }

}
