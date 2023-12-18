import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User, Business } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  //UserDetails API
  getAllUserDetails(): Observable<any> {
    return this.http.get<User[]>("http://localhost:3000/users");
    // return this.http.get("https://dsboxapi.beatsacademy.in/api/UserDetails/");
  }

  updateUser(userData: User, id: number) {
    return this.http.put<User>(`http://localhost:3000/users/${id}`, userData);
    // return this.http.put("https://dsboxapi.beatsacademy.in/api/UserDetails/${id}`, registerObj");
  }

  getUserId(id: number): Observable<any> {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  //BusinessDetails API
  getAllBusinessDetails(): Observable<any> {
    return this.http.get<Business[]>("http://localhost:3000/business");
    // return this.http.get("https://dsboxapi.beatsacademy.in/api/BusinessDetails");
  }

  updateBusiness(businessData: User, id: number) {
    return this.http.put<Business>(`http://localhost:3000/business/${id}`, businessData);
    // return this.http.put("https://dsboxapi.beatsacademy.in/api/UserDetails/${id}`, registerObj");
  }

  getBusinessId(id: number): Observable<any> {
    return this.http.get<Business>(`http://localhost:3000/business/${id}`);
  }





  //SubscriptionsDetails API
  getAllSubscriptionsDetails(): Observable<any> {
    return this.http.get("http://localhost:3000/subscriptionData");
    // return this.http.get("https://dsboxapi.beatsacademy.in/api/SubscriptionsDetails/");
  }
}
