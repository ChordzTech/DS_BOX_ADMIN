import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(adminname: string, adminpassword: string): Observable<any> {
    const data = { adminname, adminpassword };
    return this.http.post<any>(`${this.url}/api/AdminLogin/`, data);
  }

  isLoggedIn() {
    return !!localStorage.getItem('admin');
  }
}
