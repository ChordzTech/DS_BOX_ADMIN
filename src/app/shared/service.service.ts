import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  //BusinessDetails API
  getAllBusinessDetails(): Observable<any> {
    return this.http.get("http://localhost:3000/business");

    // return this.http.get("https://dsboxapi.beatsacademy.in/api/BusinessDetails");
  }

  //SubscriptionsDetails API
  getAllSubscriptionsDetails(): Observable<any> {
    return this.http.get("http://localhost:3000/subscriptionData");

    // return this.http.get("https://dsboxapi.beatsacademy.in/api/SubscriptionsDetails/");
  }

  //UserDetails API
  getAllUserDetails(): Observable<any> {
    return this.http.get("http://localhost:3000/users");

    // return this.http.get("https://dsboxapi.beatsacademy.in/api/UserDetails/");
  }

  // Update Data
  updateBusinessDetails(businessid: number, data: any): Observable<any> {
    return this.http.put(`https://dsboxapi.beatsacademy.in/api/BusinessDetails/${businessid}`, data);
  }
}
